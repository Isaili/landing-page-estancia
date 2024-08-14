const geoip = require('geoip-lite');
const Branch = require('../models/Branch');

exports.assignBranchByIP = async (req, res) => {
    try {
        // Obtén la IP del cliente
        const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
        const geo = geoip.lookup(ip);

        if (geo) {
            const branches = await Branch.find();
            const nearestBranch = findNearestBranch(geo.ll, branches);

            if (nearestBranch) {
                res.status(200).json({ branch: nearestBranch });
            } else {
                res.status(404).json({ message: 'No branches found' });
            }
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error finding branch', error });
    }
};

function findNearestBranch(userLocation, branches) {
    let nearestBranch = null;
    let minDistance = Infinity;

    branches.forEach(branch => {
        const distance = getDistance(userLocation, branch.location.coordinates);
        if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = branch;
        }
    });

    return nearestBranch;
}

function getDistance([lat1, lon1], [lat2, lon2]) {
    const R = 6371e3; // Radio de la Tierra en metros
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}
