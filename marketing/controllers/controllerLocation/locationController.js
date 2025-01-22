const geoip = require('geoip-lite');
const Branch = require('../../models/modelBranch/Branch');

exports.assignBranchByIP = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('IP del cliente:', ip);

        const geo = geoip.lookup(ip);
        console.log('Información geográfica:', geo);
       

        const branches = await Branch.find();
        console.log('Número de sucursales encontradas:', branches.length);

        if (branches.length === 0) {
            return res.status(404).json({ message: 'No branches found' });
        }

        let nearestBranch;
        let userLocation;

        if (geo && geo.ll) {
            userLocation = geo.ll;
            console.log('Ubicación del usuario:', userLocation);
            nearestBranch = findNearestBranch(userLocation, branches);
        } else {
            console.log('No se pudo determinar la ubicación del usuario');
            nearestBranch = branches[0];
        }

        console.log('Sucursal más cercana:', nearestBranch);

        res.status(200).json({ 
            branch: nearestBranch,
            userLocation: userLocation || null,
            message: userLocation ? 'Sucursal más cercana determinada' : 'Ubicación no determinada, se devuelve la primera sucursal'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error finding branch', error: error.message });
    }
};

function findNearestBranch(userLocation, branches) {
    let nearestBranch = null;
    let minDistance = Infinity;

    branches.forEach(branch => {
        
        const branchCoordinates = [branch.location.coordinates[1], branch.location.coordinates[0]]; 

        const distance = getDistance(userLocation, branchCoordinates); 
        console.log(`Distancia desde ${userLocation} a ${branchCoordinates}: ${distance.toFixed(2)} km`);
     
        if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = branch;
        }
    });

    return nearestBranch;
}


function getDistance([lat1, lon1], [lon2, lat2]) {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}