import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';
import TaskAdd from '../taskList/TaskAdd';
import TaskActions from '../taskList/TaskActions';
import useTasks from '../../hooks/useTasks';

const CardStyled = styled(Card)`
  background-color: var(--card-bg);
  color: var(--text);
  width: 18rem;
  height: auto;
`;

const ListGroupStyled = styled(ListGroup)`
  background-color: var(--card-bg);
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TaskItem = styled(ListGroup.Item)`
  background-color: var(--task-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: .5rem .75rem;
  gap: .5rem;
`;

const TaskText = styled.span`
  flex: 1 1 auto;
  margin-right: .5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BadgeState = styled.span`
  font-size: .75rem;
  padding: .15rem .4rem;
  border-radius: 6px;
  background: rgba(0,0,0,0.06);
  margin-right: .5rem;
`;

const ModalStyled = styled(Modal)`
  .modal-content {
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }

  .modal-header{
    background-color: transparent;
    color: var(--text); 
    flex: 0 0 auto;
  }

  .modal-body {
    display: flex;
    overflow-y: auto;       
    justify-content: center;   
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: transparent;
    color: var(--text);
  }

  .modal-footer {
    background-color: transparent;
    color: var(--text);
    flex: 0 0 auto;
  }

  .modal-title {
    color: var(--text);
  }

  /* Botones dentro del modal */
  .btn-secondary {
    background-color: 'primary' !important;
    color: var(--button-text) !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
  }

  .btn-primary {
    background-color: var(--button-bg) !important;
    color: var(--button-text) !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
  }

  .btn-secondary:hover,
  .btn-primary:hover {
    background-color: var(--button-bg-hover) !important;
    opacity: 0.9;
  }
`; 

function CardsDetail({ show, onHide }) {
  const {
    tasks,
    addTask,
    deleteTask,
    editTaskPrompt,
    cycleState,
    toggleComplete,
    setTaskState,
  } = useTasks([]);

  const handleClose = onHide;

  return (
    <ModalStyled show={!!show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tal dia</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CardStyled>
          <ListGroupStyled variant="flush">
            {tasks.map((t, i) => (
              <TaskItem key={t.id ?? i}>
                <TaskText>{t.text}</TaskText>
                <BadgeState>{t.state}</BadgeState>
                <TaskActions
                  index={i}
                  isDone={t.state === 'done'}
                  onComplete={toggleComplete}
                  onEdit={editTaskPrompt}
                  onState={cycleState}
                  onDelete={deleteTask}
                />
              </TaskItem>
            ))}
          </ListGroupStyled>
        </CardStyled>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose}>Cerrar</Button>
        <TaskAdd onAdd={addTask} />
      </Modal.Footer>
    </ModalStyled>
  );
}

export default CardsDetail;