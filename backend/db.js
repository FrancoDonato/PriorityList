require('dotenv').config();
const { Pool } = require('pg');

// Crear pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Probar conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error al conectar a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL');
    release();
  }
});

// Exportar función query para usar en el servidor
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};