require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./marketing/routes/userRoutes');
const contactRoutes = require('./marketing/routes/contactRoutes');
const heatmapRoutes = require('./marketing/routes/heatmapRoutes');
const locationRoutes = require('./marketing/routes/locationRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Registrar las rutas de middleware 

app.use('/api/users', userRoutes);       // Rutas para usuarios
app.use('/api/contact', contactRoutes);  // Rutas para contactos
app.use('/api/heatmap', heatmapRoutes);  // Rutas para mapa de calor
app.use('/api/location', locationRoutes); // Rutas para ubicación

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB :)'))
    .catch(error => console.error('Error al conectar a MongoDB :(', error));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
