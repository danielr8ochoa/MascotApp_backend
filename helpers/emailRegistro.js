import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = await transporter.sendMail({
      from: "MascotApp",
      to: email,
      subject: "Confirma tu cuenta en MascotApp",
      text: 'Confirma tu cuenta en MascotApp',
      html: `<p>Hola: ${nombre}, estás a un paso de obtener tu cuenta en MascotApp.</p> 
          <p>Tu cuenta ya está lista, sólo debes confirmarla visitando el siguiente enlace:
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Confirmar cuenta</a> </p>
          
          <p>Si tú no solicitaste crear esta cuenta, puedes ignorar este mensaje. </p>
      `
    });

    console.log("Mensaje enviado: %s", info.messageId);
};


export default emailRegistro