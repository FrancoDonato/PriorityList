import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { styled } from 'styled-components';

const ModalStyled = styled(Modal)`
  .modal-content {
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: var(--shadow-modalTitle-bg);
  }
`;

const ButtonStyled = styled(Button)`
  background-color: var(--button-bg);
  color: var(--text);
  border: none;

  &:hover {
    background-color: var(--button-bg-hover);
    color: var(--text);
  }
`;

export default function EditCardModal({ show, onHide, onConfirm, card }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (show) setTitle(card?.title ?? '');
  }, [show, card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = (title ?? '').trim();
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    onConfirm && onConfirm(card?.id, formatted);
    onHide && onHide();
  };

  if (!show) return null;

  return (
    <ModalStyled show={!!show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar título</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </Form.Group>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
            <ButtonStyled onClick={onHide}>Cancelar</ButtonStyled>
            <ButtonStyled type="submit">Guardar</ButtonStyled>
          </div>
        </Form>
      </Modal.Body>
    </ModalStyled>
  );
}