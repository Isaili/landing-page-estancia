const Heatmap = require('../../models/modelHeatmap/Heatmap');

// Actualiza los datos del mapa de calor
exports.updateHeatmap = async (req, res) => {
    const { section, action, x, y } = req.body;
    try {
        // Buscar documento que coincida con la sección, acción y coordenadas
        let heatmap = await Heatmap.findOne({ section, action, x, y });

        if (heatmap) {
            // Si existe, incrementar el contador
            heatmap.count += 1;
        } else {
            // Si no existe, crear un nuevo documento
            heatmap = new Heatmap({ section, action, x, y, count: 1 });
        }
        
        await heatmap.save();
        res.status(200).json({ message: 'Heatmap updated', heatmap });
    } catch (error) {
        console.error('Error updating heatmap:', error);
        res.status(500).json({ message: 'Error updating heatmap', error });
    }
};


// Obtiene los datos del mapa de calor
exports.getHeatmapData = async (req, res) => {
    try {
        const data = await Heatmap.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching heatmap data:', error);
        res.status(500).json({ message: 'Error fetching heatmap data', error });
    }
};

// Controlador para obtener conteos por sección
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

