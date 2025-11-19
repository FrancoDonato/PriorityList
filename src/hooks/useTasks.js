import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getTasksByCard } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function useTasks(card_id) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !card_id) {
      setTasks([]);
      return;
    }
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Usa un endpoint que devuelva solo las tareas de la card
        const data = await getTasksByCard(card_id);
        setTasks(data || []);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, [token, card_id]);

  const addTask = async ({ title }) => {
    if (!title?.trim()) return;
    try {
      const t = await createTask(title.trim().charAt(0).toUpperCase() + title.trim().slice(1), card_id);
      setTasks(prev => [t, ...prev]);
    } catch (e) {
      setError(e.message || 'Error al agregar tarea');
    }
  };

  const editTask = async (id, patch) => {
    try {
      const updated = await updateTask(id, patch);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
    } catch (e) {
      setError(e.message || 'Error al editar tarea');
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      setError(e.message || 'Error al eliminar tarea');
    }
  };

  // helpers que esperan la API antes de actualizar el estado
  const toggleStatus = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const order = ['todo', 'in-progress', 'done'];
    const i = order.indexOf(task.status);
    const next = order[(i + 1) % order.length];
    await editTask(id, { status: next });
  };

  const cycleAssignment = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.status === 'done') return;
    const next = task.assignment === 'priority' ? 'assigned' : 'priority';
    await editTask(id, { assignment: next });
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleStatus,
    cycleAssignment,
  };
}
