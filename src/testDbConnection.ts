import pool from './db';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexión exitosa a la base de datos');
    client.release();
  } catch (err) {
    console.error('Error conectando a la base de datos', err);
  }
}

testConnection();
