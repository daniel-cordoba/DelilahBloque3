# DelilahBloque3
API REST del restaurante Delilah, la cual se encargará de manejar y almacenar los pedidos de manera efectiva en una base de datos para su administracion y visualización.

Para ver información detallada de los Endpoints en la API, cargue el archivo `swagger.yaml` en el siguiente enlace [SWAGGER](https://editor.swagger.io).

## Requisitos locales para ejecutar la aplicación
1. Para que la API REST funcione correctamente debe instalar lo siguiente en su ordenador:

    - [NodeJS](https://nodejs.org/es/).

    - `MySQL`Para el cual le propongo, siga cualquiera de las 2 guías siguientes:
        * [MySQL-Link1](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/windows-installation.html) 
        * [MySQL-Link2](https://www.tutorialesprogramacionya.com/mysqlya/temarios/descripcion.php?inicio=0&cod=2&punto=1) 

2. Luego, debe crear la base de datos, para lo cual ejecutará el script `create.sql` en el gestos de base de datos `MySQL Workbench`. Para evitar errores, cargue el archivo en el gesto de base de datos y luego lo ejecuta (Lo anterior, porque en algunos casos, ejecutarlo directamente, antes de importarlo, puede generar errores).

3. Al tener lista la base de datos, procedemos a configurar las variables de entorno (Tener en cuenta que dentro de estas variables de entorno también vamos a configurar el usario administrador, el cual tendrá acceso a los Endpoint que requieran de su rol), para lo cual debe crear un archivo `.env` en la carpeta principal de la aplicacion. Dentro del `.env` escribirá el siguiente texto, reemplazando aquello que se encuentra entre `<>` (Incluyendo los símbolos) por las variables correspondientes a su entorno local:

```
U=<Usuario configurado en la base de datos que usualmente es root>
P=<Contraseña de la base de datos>
S=<Llave de seguridad para los tokens>
H=<Host que si va a ser ejecutado en entorno local es 127.0.0.1>
PORT=<Puerto de la base de datos que usualmente es 3306>
U_ADMIN=<Usuario administrador>
P_ADMIN=<Contraseña de usuario administrador>
```

4. Instalar las dependencias de la aplicacion, ejecutando por medio de consola el comando `npm install` (Tener en cuenta que la ruta de la consola debe estar ubicada en la carpeta principal del proyecto).

5. Por último, ejecutar la aplicacion por medio de consola, usando el comando `npm start`.
    
