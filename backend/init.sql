-- Usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tareas
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo',       -- 'todo' | 'in-progress' | 'done'
  assignment TEXT NOT NULL DEFAULT 'assigned', -- 'assigned' | 'priority'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);