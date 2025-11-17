import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { styled } from 'styled-components';

const ModalStyled = styled(Modal)`
  .modal-content {
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: var(--shadow-modalTitle-bg);
  }
`;

export default function ModalDeleteCards({ show = false, onHide, onConfirm, card }) {
  if (!card) return null; // No renderizar si no hay tarjeta seleccionada

  return (
    <ModalStyled show={!!show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar:
        {card.title ? ` "${card.title}"` : ' esta tarjeta'}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={() => onConfirm(card.id)}>Eliminar</Button>
      </Modal.Footer>
    </ModalStyled>
  );
}