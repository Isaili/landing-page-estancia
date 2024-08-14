require('dotenv').config();
const mongoose = require('mongoose');
const Branch = require('./marketing/models/Branch');

console.log('Mongo URI:', process.env.MONGO_URI); // Verifica el valor de MONGO_URI

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    return Branch.create({
        name: 'Sucursal Ejemplo',
        address: 'Dirección Ejemplo',
        location: {
            type: 'Point',
            coordinates: [ -73.856077, 40.848776 ] // Longitud, Latitud
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
