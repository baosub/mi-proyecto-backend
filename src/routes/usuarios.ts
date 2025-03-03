import { Router } from 'express';
import pool from '../db';

const router = Router();

// Ruta para crear la tabla
router.get('/create-table', async (req, res) => {
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

// Ruta para insertar datos
router.post('/insertar-usuario', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO usuarios (nombre, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await client.query(insertQuery, [nombre, email]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error insertando datos', err);
    res.status(500).send('Error insertando datos');
  }
});

export default router;
