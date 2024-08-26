const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    subject: String,
    dateSubmitted: { type: Date, default: Date.now },

});

module.exports = mongoose.model('contact', contactSchema);