const User = require('../../models/modelUser/User');
const axios = require('axios');

// Registrar la visita del usuario
exports.registerVisit = async (req, res) => {
    const { ipAddress, userAgent, referrer, location } = req.body;
    try {
        const user = new User({ ipAddress, userAgent, referrer, location });
        await user.save();

      
        const response = await axios.post(
            'http://localhost:5000/api/location/branch',
            {},
            {
                headers: {
                    'x-forwarded-for': ipAddress 
                }
            }
        );

       
        if (response.data.branch) {
            user.assignedBranch = response.data.branch._id; 
            await user.save();

            const branch = response.data.branch;
            res.status(201).json({
                message: 'Visita registrada con sucursal asignada',
                user: {
                    ...user.toObject(), 
                    branch: {
                        id: branch._id,
                        name: branch.name,
                        address: branch.address
                    }
                }
            });
        } else {
            res.status(201).json({
                message: 'Visita registrada sin sucursal asignada',
                user: user
            });
        }
    } catch (error) {
        console.error('Error al registrar visita:', error); 
        res.status(500).json({ message: 'Error al registrar visita', error: error.message });
    }
};

// Registrar la actividad del usuario
exports.logActivity = async (req, res) => {
    const { userId, type, element, position } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.activity.push({ type, element, position });
            await user.save();
            res.status(200).json({ message: 'Activity logged', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error al registrar actividad:', error); 
        res.status(500).json({ message: 'Error logging activity', error: error.message });
    }
};
