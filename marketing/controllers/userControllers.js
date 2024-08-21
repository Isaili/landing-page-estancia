const User = require('../models/User');
const axios = require('axios');

// Registrar la visita del usuario
exports.registerVisit = async (req, res) => {
    const { ipAddress, userAgent, referrer, location } = req.body;
    try {
        const user = new User({ ipAddress, userAgent, referrer, location });
        await user.save();

        // Llamar al endpoint para asignar la sucursal más cercana
        const response = await axios.post(
            'http://localhost:5000/api/location/branch',
            {},
            {
                headers: {
                    'x-forwarded-for': ipAddress // Pasar la IP al endpoint en los headers
                }
            }
        );

        // Verificar si se ha recibido una sucursal
        if (response.data.branch) {
            // Actualizar el usuario con la sucursal asignada
            user.assignedBranch = response.data.branch._id; // Almacena solo el ID de la sucursal
            await user.save();

            // Incluir información de la sucursal en la respuesta
            const branch = response.data.branch; // Obtener la sucursal desde la respuesta
            res.status(201).json({
                message: 'Visita registrada con sucursal asignada',
                user: {
                    ...user.toObject(), // Convertir el documento de Mongoose a un objeto simple
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
        console.error('Error al registrar visita:', error); // Muestra el error en la consola
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
        console.error('Error al registrar actividad:', error); // Muestra el error en la consola
        res.status(500).json({ message: 'Error logging activity', error: error.message });
    }
};
