require('dotenv').config();
const mongoose = require('mongoose');
const Branch = require('./marketing/models/modelBranch/Branch');

console.log('Mongo URI:', process.env.MONGO_URI); 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    return Branch.create({
        name: ' Tuxtla Gutierrz',
        address: 'Centro de Tuxtla Gutiérrez',
        location: {
            type: 'Point',
            coordinates: [-93.1149, 16.7528] // Longitud, Latitud
        }
    });
})
.then(() => {
    console.log('Sucursal guardada');
    mongoose.connection.close(); // Cierra la conexión después de guardar
})
.catch(error => {
    console.error('Error guardando sucursal:', error);
    mongoose.connection.close(); // Cierra la conexión en caso de error
});
