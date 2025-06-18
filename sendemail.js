const nodemailer = require('nodemailer');

async function enviarCorreoConManejoErrores(remitente, passwordApp, destinatario, asunto, cuerpoMensajeHtml, cuerpoMensajeTexto) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: remitente,    
            pass: passwordApp
        },
    });

    const mailOptions = {
        from: `"Edwin Giraldo" <${remitente}>`, 
        to: destinatario,                               
        subject: asunto,                                
        html: cuerpoMensajeHtml,                        
        text: cuerpoMensajeTexto,                       
        // attachments: [ // <- Opcional: Para adjuntar archivos
        //     {
        //         filename: 'documento.pdf',
        //         path: './ruta/a/tu/documento.pdf',
        //         contentType: 'application/pdf'
        //     }
        // ]
    };
    try {
        console.log(`Intentando enviar correo a: ${destinatario} desde: ${remitente}`);
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente!');
        console.log('ID del mensaje:', info.messageId);
        console.log('Respuesta del servidor:', info.response);
        return { success: true, messageId: info.messageId, response: info.response };
    } catch (error) {
        console.error('Hubo un error al enviar el correo:');
        console.error(error);
        if (error.code === 'EENVELOPE') {
            console.error('Error de sobre (envelope): Problema con las direcciones de remitente o destinatario.');
        } else if (error.code === 'EAUTH') {
            console.error('Error de autenticación: Verificar el correo y la contraseña de aplicación.');
        } else if (error.code === 'ETIMEOUT') {
            console.error('Tiempo de espera agotado: Problema de conexión con el servidor SMTP.');
        } else if (error.command === 'MAIL FROM') {
            console.error('Error al establecer el remitente (MAIL FROM).');
        } else {
            console.error('Tipo de error desconocido.');
        }
        return { success: false, error: error.message, errorCode: error.code };
    }
}

async function main() {
    const REMITENTE = ''; // <- Quien envia el correo
    const PASSWORD_APP = ''; // <- Contraseña de aplicacion
    const DESTINATARIO = ''; // <- A quien se le envia el correo
    const ASUNTO = '¡Saludos desde Sena, Itagui, enviando correos desde Node'; // <- Titulo de email
    const CUERPO_HTML = `
        <p>Hola, <b>"NOMBRE DE QUIEN LO RECIBE EL EMAIL"</b>,</p>
        <p>Este es un correo de prueba enviado desde <b>Node.js</b> con <b>Nodemailer</b>.</p>
        <p></p>
        <p>¡Espero se te alla llegado!</p>
        <p>Saludos,<br>"NOMBRE DE QUIEN ENVIA EL EMAIL"</p>
    `;
    const CUERPO_TEXTO = `
       Este correo se envio como correo de Prueba
    `;

    const resultadoEnvio = await enviarCorreoConManejoErrores(
        REMITENTE,
        PASSWORD_APP,
        DESTINATARIO,
        ASUNTO,
        CUERPO_HTML,
        CUERPO_TEXTO
    );

    if (resultadoEnvio.success) {
        console.log('\nOperación de envío finalizada con ÉXITO.');
    } else {
        console.log('\nOperación de envío FINALIZADA con ERRORES.');
        console.log('Detalles del error:', resultadoEnvio.error);
    }
}

main();