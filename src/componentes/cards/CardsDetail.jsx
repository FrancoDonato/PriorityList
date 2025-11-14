import React, { useState } from 'react';
import ModalTaskEdit from '../modals/ModalTaskEdit';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';
import TaskAdd from '../taskList/TaskAdd';
import TaskActions from '../taskList/TaskActions';
import useTasks from '../../hooks/useTasks';
import ModalDeleteTask from './ModalDeleteTask'; 

const CardStyled = styled(Card)`
  background-color: transparent;
  border: none;
  color: var(--text);
  width: 18rem;
  height: auto;
`;

const ListGroupStyled = styled(ListGroup)`
  background-color: transparent;
  display: flex;
  width: 100%;
  border: none;
  flex-direction: column;
  padding-bottom: 1.5rem; 
`;

const TaskItem = styled(ListGroup.Item)`
  background-color: var(--task-bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: .5rem;
  padding: .5rem .75rem;
  z-index: 1;                    

  /* borde visual según el estado */
  border: ${props => (
    props.$assignment === 'priority' ? '3px solid var(--priority-border, #ff0000) !important' :
    props.$assignment === 'assigned' ? '2px dashed var(--assigned-border, #90caf9) !important' :
    '1px solid transparent'
  )};
  border-radius: 8px;
`;

const TaskText = styled.span`
  flex: 1 1 auto;
  margin-right: .5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalStyled = styled(Modal)`
  .modal-content {
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
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

function CardsDetail({ show, onHide, title }) {
  const {
    tasks,
    addTask,
    deleteTask,
    editTask,         
    editTaskPrompt,
    cycleState,
    toggleComplete,
    setTaskState,
  } = useTasks([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleRequestEdit = (idOrIndex) => {
    const idx = typeof idOrIndex === 'number' ? tasks.findIndex(t => t.id === idOrIndex) : -1;
    const task = tasks.find(t => t.id === idOrIndex) ?? (tasks[idx] ?? null);
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleConfirmEdit = (id, newTitle) => {
    if (typeof editTask === 'function') editTask(id, newTitle);
  };

  const handleCloseEdit = () => {
    setTaskToEdit(null);
    setShowEditModal(false);
  };

  const handleClose = onHide;

  const handleRequestDelete = (index) => {
    const t = tasks[index] ?? null;
    setTaskToDelete(t ? { index, task: t } : null);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete?.index != null) {
      deleteTask(taskToDelete.index);
    }
    handleCancelDelete();
  };

  return (
    <ModalStyled show={!!show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CardStyled>
          <ListGroupStyled variant="flush">
            {tasks.map((t, i) => (
              <TaskItem key={t.id ?? i} $assignment={t.assignment}>
                <TaskText>{t.text}</TaskText>
                <TaskActions
                  index={i}
                  id={t.id}
                  isDone={t.status === 'done'}
                  onComplete={toggleComplete}
                  onEdit={handleRequestEdit}    
                  onState={cycleState}
                  onDelete={() => handleRequestDelete(i)}
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

      {/* modal de edición */}
      <ModalTaskEdit
        show={showEditModal}
        onHide={handleCloseEdit}
        onConfirm={handleConfirmEdit}
        task={taskToEdit}
      />

      {/* modal de confirmación de borrado existente */}
      <ModalDeleteTask
        show={showDeleteModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        task={taskToDelete?.task}
      />
    </ModalStyled>
  );
}

export default CardsDetail;