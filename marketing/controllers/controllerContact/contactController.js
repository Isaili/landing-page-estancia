const Contact = require('../../models/modelContact/Contact')
const nodemailer = require('nodemailer');


exports.submitForm = async (req, res) => {
    const { firstName, lastName, email, address, subject } = req.body;
    try {
        const contact = new Contact({ firstName, lastName, email, address, subject });
        await contact.save();

        // Notificación al administrador
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: 'Nuevo formulario de contacto',
            text: `Se ha recibido un nuevo formulario de contacto:\n\nNombre: ${firstName} ${lastName}\nEmail: ${email}\nDirección: ${address}\nAsunto: ${subject}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Error submitting form hola', contact });
    } catch (error) {
        res.status(500).json({ message: 'Form submitted successfully mal inertir', error });
    } 
};