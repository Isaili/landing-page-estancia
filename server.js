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

//registrar lasn rutas de middleware 

app.use('/api/users', userRoutes);       // Rutas para usuarios
app.use('/api/contact', contactRoutes);  // Rutas para contactos
app.use('/api/heatmap', heatmapRoutes);  // Rutas para mapa de calor
app.use('/api/location', locationRoutes);



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('conectado a mongoDB'))
.catch(error => console.error('error al conectar monggoDB :(',error));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});