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
import ModalDeleteTask from '../modals/ModalDeleteTask';

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
    editTask,
    removeTask,
    toggleStatus,
    cycleAssignment,
  } = useTasks();

  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Editar tarea
  const handleRequestEdit = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleConfirmEdit = (id, newTitle, newDetail) => {
    editTask(id, { title: newTitle, detail: newDetail });
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  // Borrar tarea
  const handleRequestDelete = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete?.id) {
      removeTask(taskToDelete.id);
    }
    handleCancelDelete();
  };

  const handleClose = onHide;

  return (
    <ModalStyled show={!!show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CardStyled>
          <ListGroupStyled variant="flush">
            {tasks.map((t) => (
              <TaskItem key={t.id} $assignment={t.assignment}>
                <TaskText>{t.title}</TaskText>
                <TaskActions
                  id={t.id}
                  isDone={t.status === 'done'}
                  onComplete={() => toggleStatus(t.id)}
                  onEdit={() => handleRequestEdit(t.id)}
                  onState={() => cycleAssignment(t.id)}
                  onDelete={() => handleRequestDelete(t.id)}
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

      {/* modal de confirmación de borrado */}
      <ModalDeleteTask
        show={showDeleteModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
      />
    </ModalStyled>
  );
}

export default CardsDetail;