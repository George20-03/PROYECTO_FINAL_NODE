const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bbdd_final'
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware para analizar application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio actual (__dirname)
app.use(express.static(__dirname));

// Rutas para las páginas HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/FORMULARIO_INDEX.html');
});

app.get('/pagina2', (req, res) => {
  res.sendFile(__dirname + '/FORMULARIO_DATOS_PERSONALES.html');
});

app.get('/pagina3', (req, res) => {
  res.sendFile(__dirname + '/FORMULARIO_INFORMACION_CONTACTO.html');
});

app.get('/pagina4', (req, res) => {
  res.sendFile(__dirname + '/FORMULARIO_DIRECCION.html');

});

// Ruta para manejar el envío del formulario
app.post('/formulario', (req, res) => {
  const datos = req.body;

  // Insertar datos en la base de datos
  connection.query('INSERT INTO datos_personales (nombre, apellido, user_id) VALUES (?, ?, ?)', [datos.nombre, datos.apellido, datos.user_id], (error, results, fields) => {
    if (error) {
      console.error('Error al insertar datos en la tabla datos_personales: ', error);
      return res.status(500).send('Error al insertar datos en la tabla datos_personales: ' + error.message); // Envía un mensaje detallado del error
    } 
    console.log('Datos insertados correctamente en la tabla datos_personales');
    res.sendFile(__dirname + '/FORMULARIO_INFORMACION_CONTACTO.html'); // Envía la página de éxito después de guardar los datos
  });
});

app.post('/formulario2', (req, res) => {
  const datos = req.body;

  // Insertar datos en la base de datos
  connection.query('INSERT INTO informacion_contacto (email, telefono, user_id) VALUES (?, ?, ?)', [datos.email, datos.telefono, datos.user_id], (error, results, fields) => {
    if (error) {
      console.error('Error al insertar datos en la tabla informacion_contacto: ', error);
      return res.status(500).send('Error al insertar datos en la tabla informacion_contacto: ' + error.message); // Envía un mensaje detallado del error
    } 
    console.log('Datos insertados correctamente en la tabla informacion_contacto');
    res.sendFile(__dirname + '/FORMULARIO_DIRECCION.html'); // Envía la página de éxito después de guardar los datos
  });
});


app.post('/formulario3', (req, res) => {
  const datos = req.body;

  // Insertar datos en la base de datos
  connection.query('INSERT INTO direccion (calle, ciudad, codigo_postal, user_id) VALUES (?, ?, ?, ?)', [datos.calle, datos.ciudad, datos.codigo_postal, datos.user_id], (error, results, fields) => {
    if (error) {
      console.error('Error al insertar datos en la tabla direccion: ', error);
      return res.status(500).send('Error al insertar datos en la tabla direccion: ' + error.message); // Envía un mensaje detallado del error
    } 
    console.log('Datos insertados correctamente en la tabla direccion');
    res.sendFile(__dirname + '/FORMULARIO_TERMINADO.html'); // Envía la página de éxito después de guardar los datos
});
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
