import { useState } from 'react';

const CYCLE_STATES = ['assigned', 'priority'];          // ciclo para cycleState
const TOGGLE_STATES = ['todo', 'in-progress', 'done'];  // ciclo para toggleComplete

function normalizeInitial(initial = []) {
  return initial.map((t, i) => {
    if (typeof t === 'string') {
      return { id: `${Date.now()}-${i}-${Math.random()}`, text: t, state: 'todo' };
    }
    return {
      id: t.id ?? `${Date.now()}-${i}-${Math.random()}`,
      text: t.text ?? '',
      state: t.state ?? 'todo',
    };
  });
}

export default function useTasks(initial = []) {
  const [tasks, setTasks] = useState(normalizeInitial(initial));

  const addTask = (text) => {
    if (!text || !text.trim()) return;
    const formatted = text.trim().charAt(0).toUpperCase() + text.trim().slice(1);
    const task = { id: `${Date.now()}-${Math.random()}`, text: formatted, state: 'todo' };
    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const editTask = (index, newText) => {
    if (typeof newText !== 'string') return;
    const text = newText.trim();
    if (!text) return;
    const formatted = text.charAt(0).toUpperCase() + text.slice(1);
    setTasks(prev => prev.map((t, i) => (i === index ? { ...t, text: formatted } : t)));
  };

  const editTaskPrompt = (index) => {
    const current = tasks[index] ?? { text: '' };
    const updated = window.prompt('Editar tarea', current.text);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    editTask(index, formatted);
  };

  // cycleState: cicla entre 'assigned' <-> 'priority' (ignora 'done')
  const cycleState = (index, forcedState) => {
    setTasks(prev => {
      if (index < 0 || index >= prev.length) return prev;
      const copy = [...prev];
      const current = copy[index];

      if (current.state === 'done') return prev;

      if (typeof forcedState === 'string') {
        if (!CYCLE_STATES.includes(forcedState)) return prev;
        copy[index] = { ...current, state: forcedState };
        return copy;
      }

      const pos = CYCLE_STATES.indexOf(current.state);
      const next = pos === -1 ? CYCLE_STATES[0] : CYCLE_STATES[(pos + 1) % CYCLE_STATES.length];
      copy[index] = { ...current, state: next };
      return copy;
    });
  };

  // toggleComplete: cicla entre todo -> in-progress -> done -> todo
  // acepta forcedState opcional (solo si está en TOGGLE_STATES)
  const toggleComplete = (index, forcedState) => {
    setTasks(prev => {
      if (index < 0 || index >= prev.length) return prev;
      const copy = [...prev];
      const current = copy[index];

      if (typeof forcedState === 'string') {
        if (!TOGGLE_STATES.includes(forcedState)) return prev;
        copy[index] = { ...current, state: forcedState };
        return copy;
      }

      const pos = TOGGLE_STATES.indexOf(current.state);
      const next = pos === -1 ? TOGGLE_STATES[0] : TOGGLE_STATES[(pos + 1) % TOGGLE_STATES.length];
      copy[index] = { ...current, state: next };
      return copy;
    });
  };

  // setTaskState: asignar cualquier estado explícito (validado)
  const setTaskState = (index, state) => {
    if (typeof state !== 'string') return;
    setTasks(prev => {
      if (index < 0 || index >= prev.length) return prev;
      if (!STATE_ORDER.includes(state)) return prev;
      const copy = [...prev];
      copy[index] = { ...copy[index], state };
      return copy;
    });
  };

  return {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    editTask,
    editTaskPrompt,
    cycleState,     // assigned <-> priority
    toggleComplete, // todo -> in-progress -> done -> todo
    setTaskState,
  };
}
