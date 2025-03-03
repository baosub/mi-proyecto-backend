import express from 'express';
import pool from './db';
import bodyParser from 'body-parser';
import usuariosRoutes from './routes/usuarios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/usuarios', usuariosRoutes);

app.get('/db-check', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json({ status: 'Conexión exitosa a la base de datos', time: result.rows[0].now });
    client.release();
  } catch (err) {
    console.error('Error conectando a la base de datos', err);
    res.status(500).send('Error en la conexión a la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get('/create-table', async (req, res) => {
    try {
      const client = await pool.connect();
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100),
          email VARCHAR(100) UNIQUE
        );
      `;
      await client.query(createTableQuery);
      res.send('Tabla creada exitosamente');
      client.release();
    } catch (err) {
      console.error('Error creando la tabla', err);
      res.status(500).send('Error creando la tabla');
    }
  });