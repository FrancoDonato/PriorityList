import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';

const CardStyled = styled(Card)`
  background-color: var(--card-bg);
  color: var(--text);
  width: 18rem;
  height: auto;
`;

const TaskItem = styled(ListGroup.Item)`
  background-color: var(--task-bg);
  color: var(--text);
`;

const ModalStyled = styled(Modal)`
   .modal-content {
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    background-color: transparent;
    color: var(--text);
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
  const handleClose = onHide;

  return (
    <ModalStyled show={!!show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tal dia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ListGroup variant="flush">
            <TaskItem>Tarea 1</TaskItem>
            <TaskItem>Tarea 2</TaskItem>
            <TaskItem>Tarea 3</TaskItem>
          </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>
          Completar tarea
        </Button>
        <Button>
          Agregar
        </Button>
      </Modal.Footer>
    </ModalStyled>
  );
}

export default CardsDetail;