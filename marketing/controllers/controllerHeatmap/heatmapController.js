const Heatmap = require('../../models/modelHeatmap/Heatmap');

exports.updateHeatmap = async (req, res) => {
    const { section, action, x, y } = req.body;
    try {
        let heatmap = await Heatmap.findOne({ section, action, x, y });

        if (heatmap) {
            heatmap.count += 1;
        } else {
            heatmap = new Heatmap({ section, action, x, y, count: 1 });
        }
        
        await heatmap.save();
        res.status(200).json({ message: 'Heatmap updated', heatmap });
    } catch (error) {
        console.error('Error updating heatmap:', error);
        res.status(500).json({ message: 'Error updating heatmap', error });
    }
};



exports.getHeatmapData = async (req, res) => {
    try {
        const data = await Heatmap.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching heatmap data:', error);
        res.status(500).json({ message: 'Error fetching heatmap data', error });
    }
};

exports.getHeatmapCounts = async (req, res) => {
    try {
        const counts = await Heatmap.aggregate([
            {
                $group: {
                    _id: { section: "$section", action: "$action" },
                    totalCount: { $sum: "$count" }
                }
            }
        ]);
        res.status(200).json(counts);
    } catch (error) {
        console.error('Error fetching heatmap counts:', error);
        res.status(500).json({ message: 'Error fetching heatmap counts', error });
    }
};

