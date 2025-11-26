import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getAllTasks } from '../../api/client';

const Lista = styled.ul`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  background: var(--card-bg);
  color: var(--text);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: var(--shadow-modalTitle-bg);
  display: flex;
  flex-direction: column;
`;

const Titulo = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Usuario = styled.span`
  font-size: 0.95rem;
  color: var(--secondary-text, #888);
`;

const Detalle = styled.span`
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

const ListaTareasAdmin = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTasks();
        setTasks(data || []);
      } catch (e) {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Cargando tareas...</div>;
  if (!tasks.length) return <div>No hay tareas registradas.</div>;

  return (
    <Lista>
      {tasks.map(task => (
        <Item key={task.id}>
          <Titulo>{task.title}</Titulo>
          <Usuario>Usuario: {task.username || task.user_id}</Usuario>
          <Detalle>Detalle: {task.detail}</Detalle>
          <span>Estado: {task.status}</span>
          <span>Asignación: {task.assignment}</span>
        </Item>
      ))}
    </Lista>
  );
};

export default ListaTareasAdmin;