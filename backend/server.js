require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// ========== ENDPOINTS DE AUTENTICACIÓN ==========

// POST /api/auth/login - Iniciar sesión
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username y password requeridos' });
  }
  const r = await db.query('SELECT id, username, password_hash FROM users WHERE username=$1', [username]);
  const user = r.rows[0];
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user: { id: user.id, username: user.username } });
});

// ========== MIDDLEWARE DE AUTENTICACIÓN ==========

function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// ========== ENDPOINTS DE TAREAS (requieren autenticación) ==========

// GET /api/tasks - Obtener todas las tareas del usuario
app.get('/api/tasks', auth, async (req, res) => {
  const r = await db.query(
    'SELECT id, title, status, assignment, created_at FROM tasks WHERE user_id=$1 ORDER BY created_at DESC',
    [req.userId]
  );
  res.json(r.rows);
});

app.get("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await db.query('SELECT id, title, status, assignment, created_at FROM tasks WHERE id=$1', [id]); // o como la busques

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
});

// POST /api/tasks - Crear nueva tarea
app.post('/api/tasks', auth, async (req, res) => {
  const { title, detail } = req.body;
  if (!title) return res.status(400).json({ error: 'title requerido' });
  const r = await db.query(
    'INSERT INTO tasks(user_id, title, detail, status, assignment) VALUES($1,$2,$3,$4,$5) RETURNING id, title, detail, status, assignment, created_at',
    [req.userId, title, detail || '', 'todo', 'assigned']
  );
  res.status(201).json(r.rows[0]);
});

// PATCH /api/tasks/:id - Editar tarea
app.patch('/api/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  const allowed = ['title', 'detail', 'status', 'assignment'];
  const sets = [];
  const values = [];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      sets.push(`${key} = $${values.length + 1}`);
      values.push(req.body[key]);
    }
  }
  if (!sets.length) return res.status(400).json({ error: 'No hay campos para actualizar' });
  values.push(req.userId, id);
  const q = `UPDATE tasks SET ${sets.join(', ')}, updated_at = now() WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING id, title, detail, status, assignment`;
  const r = await db.query(q, values);
  res.json(r.rows[0] ?? null);
});

// DELETE /api/tasks/:id - Eliminar tarea
app.delete('/api/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE user_id=$1 AND id=$2', [req.userId, id]);
  res.status(204).send();
});

// ========== INICIAR SERVIDOR ==========

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});