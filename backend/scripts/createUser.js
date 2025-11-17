require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../db');

async function main() {
  const [,, usernameArg, passwordArg] = process.argv;
  if (!usernameArg || !passwordArg) {
    console.error('Uso: node scripts/createUser.js <username> <password>');
    process.exit(1);
  }
  const username = String(usernameArg).trim();
  const password = String(passwordArg);

  try {
    const hashed = await bcrypt.hash(password, 10);
    const r = await db.query(
      'INSERT INTO users(username, password_hash) VALUES($1,$2) RETURNING id, username',
      [username, hashed]
    );
    console.log('Usuario creado:', r.rows[0]);
    process.exit(0);
  } catch (err) {
    if (err.code === '23505') {
      console.error('Error: el nombre de usuario ya existe');
    } else {
      console.error('Error creando usuario:', err.message);
    }
    process.exit(1);
  }
}

main();