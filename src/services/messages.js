import nodemailer from 'nodemailer'
import config from '../config'

const { user, pass } = config.nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass
    }
})



export const sendMail = async (req, res, next) => {
    try {
        const messageOptions = {
            from: 'Maidana Project',
            to: req.session.emal,
            subject: 'Orden de compra',
            html: `<h2>Tu ticket ${req.session.name}<h2>
            <p>  </p>`,
            // text: ''
            // attachments:[
            // {path: __dirname + etc}
            // ] rutas para enviar archivos adjuntos
        }

        await transporter.sendMail(messageOptions)
        next()
    } catch (error) {
        res.json({
            message: "Ocurrio un error inesperado",
            error
        })
    }
}