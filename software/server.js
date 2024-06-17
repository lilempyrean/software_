const express = require('express');
const app = express();
const PORT = 3000; // Puerto en el que escuchará el servidor
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcryptjs');



// Configuraci�n de CORS para permitir solicitudes desde el frontend
app.use(cors());

// Configuraci�n de body-parser para parsear las solicitudes JSON
app.use(bodyParser.json());

// Configuraci�n de la conexi�n a la base de datos SQL Server
const dbConfig = {
    user: 'TU_USUARIO',
    password: 'TU_CONTRASE�A',
    server: 'TU_SERVIDOR',
    database: 'TallerMecanico',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

// Endpoint para el inicio de sesi�n
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query(`SELECT * FROM Usuarios WHERE Username = @Username`);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const validPassword = await bcrypt.compare(password, user.Password);

            if (validPassword) {
                res.status(200).send({ success: true, message: 'Inicio de sesi�n exitoso!' });
            } else {
                res.status(401).send({ success: false, message: 'Contrase�a incorrecta' });
            }
        } else {
            res.status(404).send({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error al iniciar sesi�n: ', err);
        res.status(500).send({ success: false, message: 'Error al iniciar sesi�n' });
    }
});

// Otros endpoints existentes...

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});// JavaScript source code// JavaScript source code
