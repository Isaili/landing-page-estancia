const User = require ('../models/User');

// Registrar la visita del usuario// 
    exports.registerVisit = async (req, res) => {
        const { ipAddress, userAgent, referrer, location } = req.body;
        try {
            const user = new User({ ipAddress, userAgent, referrer, location });
            await user.save();
            res.status(201).json({ message: 'Visita registrada', user });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar visita', error });
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
        res.status(500).json({ message: 'Error logging activity', error });
    }
};

