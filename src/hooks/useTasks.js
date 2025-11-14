import { useState } from 'react';

const ASSIGNMENT_STATES = ['assigned', 'priority'];
const TOGGLE_STATES = ['todo', 'in-progress', 'done'];

function normalizeInitial(initial = []) {
  return initial.map((t, i) => {
    if (typeof t === 'string') {
      return {
        id: `${Date.now()}-${i}-${Math.random()}`,
        text: t,
        status: 'todo',
        assignment: 'assigned',
      };
    }
    return {
      id: t.id ?? `${Date.now()}-${i}-${Math.random()}`,
      text: t.text ?? '',
      status: TOGGLE_STATES.includes(t.status ?? t.state) ? (t.status ?? t.state) : 'todo',
      assignment: ASSIGNMENT_STATES.includes(t.assignment ?? t.state) ? (t.assignment ?? t.state) : 'assigned',
    };
  });
}

export default function useTasks(initial = []) {
  const [tasks, setTasks] = useState(normalizeInitial(initial));

  const findIndex = (arg, list = tasks) => {
    if (arg == null) return -1;
    const byId = list.findIndex(t => t.id === arg);
    if (byId !== -1) return byId;
    if (typeof arg === 'number' && arg >= 0 && arg < list.length) return arg;
    return -1;
  };

  const addTask = (text) => {
    if (!text || typeof text !== 'string') return;
    const trimmed = text.trim();
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    const task = { id: `${Date.now()}-${Math.random()}`, text: formatted, status: 'todo', assignment: 'assigned' };
    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (idOrIndex) => {
    setTasks(prev => {
      const idx = findIndex(idOrIndex, prev);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const editTask = (idOrIndex, newText) => {
    if (typeof newText !== 'string') return;
    const trimmed = newText.trim();
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    setTasks(prev => {
      const idx = findIndex(idOrIndex, prev);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy[idx] = { ...copy[idx], text: formatted };
      return copy;
    });
  };

  const cycleState = (idOrIndex, forcedAssignment) => {
    setTasks(prev => {
      const idx = findIndex(idOrIndex, prev);
      if (idx === -1) return prev;
      const current = prev[idx];
      if (!current) return prev;
      if (current.status === 'done') return prev; 
      let next;
      if (typeof forcedAssignment === 'string') {
        if (!ASSIGNMENT_STATES.includes(forcedAssignment)) return prev;
        next = forcedAssignment;
      } else {
        const pos = ASSIGNMENT_STATES.indexOf(current.assignment);
        next = pos === -1 ? ASSIGNMENT_STATES[0] : ASSIGNMENT_STATES[(pos + 1) % ASSIGNMENT_STATES.length];
      }
      const copy = [...prev];
      const updated = { ...current, assignment: next };
      copy.splice(idx, 1);
      if (next === 'priority') copy.unshift(updated);
      else copy.splice(Math.min(idx, copy.length), 0, updated);
      return copy;
    });
  };

  const toggleComplete = (idOrIndex, forcedState) => {
    setTasks(prev => {
      const idx = findIndex(idOrIndex, prev);
      if (idx === -1) return prev;
      const current = prev[idx];
      if (!current) return prev;
      let next;
      if (typeof forcedState === 'string') {
        if (!TOGGLE_STATES.includes(forcedState)) return prev;
        next = forcedState;
      } else {
        const pos = TOGGLE_STATES.indexOf(current.status);
        next = pos === -1 ? TOGGLE_STATES[0] : TOGGLE_STATES[(pos + 1) % TOGGLE_STATES.length];
      }
      const copy = [...prev];
      copy[idx] = { ...current, status: next };
      return copy;
    });
  };

  const setTaskState = (idOrIndex, state) => {
    if (typeof state !== 'string' || !TOGGLE_STATES.includes(state)) return;
    setTasks(prev => {
      const idx = findIndex(idOrIndex, prev);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy[idx] = { ...copy[idx], status: state };
      return copy;
    });
  };

  return {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    editTask,
    cycleState,     
    toggleComplete, 
    setTaskState,
  };
}
