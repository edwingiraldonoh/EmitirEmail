# Emitir Email con NodeMailer

### Contraseña de aplicacion
* Para enviar el correo NodeMailer nos exige una contraseña de apliacion la cual se consigue en en correo de Google que se elija para enviar el email

### Pasos para obtener la contraseña de aplicaciónes
1. Ir a Administrar cuenta de google
2. Ir al apartado seguridad
3. Debemos activar la varificaciond de 2 pasos (Esto lo exige Google para poder acceder a nuestro correo, ademas de asi habilitar la opcion de contraseña de aplicaciónes.) **Obligatorio**
4. Buscar la funcion **Contraseña de aplicaciones**
5. Crear una contraseña de aplicacion
   * En el apartado le pones el nombre de preferencia
   * Google nos dara un codigo de **16 caraceteres** el cual se muestra de forma unica. (**Solo una vez**)
6. En el codigo se especifica donde se necesita el mismo.

### inicializamos el proyecto
* Se inicializa **npm init -y.**
### Despues se instala la dependencia NodeMailer.
* Se instala con **npm install nodemailer**
### Para ejecutar el archivo principal (El cual enviara el correo en este caso Sendemail.js)
* **node sendemail.js** Con este archivo y todos los datos en el archivo se envuara con exito
