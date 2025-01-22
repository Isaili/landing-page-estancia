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
        name: 'cuidad de monterrey',
        address: 'parque fundidora',
        location: {
            type: 'Point',
            coordinates: [-100.2595, 25.6784]
        }
    });
})

.then(() => {
    console.log('Sucursal guardada');
    mongoose.connection.close(); 
})
.catch(error => {
    console.error('Error guardando sucursal:', error);
    mongoose.connection.close(); 
});
