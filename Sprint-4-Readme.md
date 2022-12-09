### Usuario Admin
Para testear el modulo de admin ingresar con el usuario:
- Email: pepea@fatiga.com
- Pass: Fatiga1.

Esto habilitará un botón en el header llamado Modo ADMIN. (este no será el lugar final)

### Usuario externo
Para testear usuario externo ingresar con:
- Email: catarom@rusia.com
- Pass: Romanov1.

Este usuario no debería tener el Modo ADMIN en el header, y si quisiera acceder a la ruta manualmente, debería redireccionar a su Perfil. 

### Notas
- No logramos aun que Multer frene el upload de la imagen si algun otro campo del form falla. Es un issue a solucionar.
- Solamente los últimos 2 users creados tienen la pass encpritada, por lo que el resto no son logeables con el proceso actual.