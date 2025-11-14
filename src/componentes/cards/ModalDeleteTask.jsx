import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { styled } from 'styled-components';

const ModalStyled = styled(Modal)`
  .modal-content {
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(255, 255, 255, 0.105);
    box-shadow: var(--shadow-modalTitle-bg);
  }
`;

export default function ModalDeleteTask({ show = false, onHide, onConfirm, task }) {
  return (
    <ModalStyled show={!!show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar la tarea
        {task?.text ? ` "${task.text}"` : ''}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={() => onConfirm && onConfirm()}>Eliminar</Button>
      </Modal.Footer>
    </ModalStyled>
  );
}