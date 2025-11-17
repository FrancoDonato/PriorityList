const BASE_URL =
  (typeof process !== 'undefined' && process.env && (process.env.VITE_API_URL || process.env.REACT_APP_API_URL)) ||
  (typeof window !== 'undefined' && window.__API_URL__) ||
  'http://localhost:4000';

let token = null;

export function setToken(newToken, persist = true) {
  token = newToken || null;
  if (persist) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }
}

export function getToken() {
  return token || localStorage.getItem('token') || null;
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const auth = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let errJson = null;
    try { errJson = await res.json(); } catch {}
    const msg = errJson?.error || errJson?.message || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  try { return await res.json(); } catch { return null; }
}

export async function login(username, password) {
  const data = await request('/api/auth/login', { method: 'POST', body: { username, password } });
  if (data?.token) setToken(data.token, true);
  return data;
}

export async function getTasks() {
  return request('/api/tasks');
}

export async function createTask(title) {
  return request('/api/tasks', { method: 'POST', body: { title } });
}

export async function updateTask(id, patch) {
  return request(`/api/tasks/${id}`, { method: 'PATCH', body: patch });
}

export async function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}