const Heatmap = require('../models/Heatmap');

exports.updateHeatmap = async (req, res) => {
    const { section, action } = req.body;  // Cambiado de res.body a req.body
    try {
        let heatmap = await Heatmap.findOne({ section, action });
        if (heatmap) {
            heatmap.count += 1;
        } else {
            heatmap = new Heatmap({ section, action });
        }
        await heatmap.save();
        res.status(200).json({ message: 'Heatmap updated', heatmap });
    } catch (error) {
        res.status(500).json({ message: 'Error updating heatmap', error });
    }
};