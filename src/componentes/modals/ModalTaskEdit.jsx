import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
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
  border: none;
  color: var(--text);

  &:hover{
    background-color: var(--button-bg-hover);
    border: none;
    color: var(--text);
  }
`;

export default function ModalTaskEdit({ show, onHide, onConfirm, task }) {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    setTitle(task?.title ?? '');
    setDetail(task?.detail ?? '');
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onConfirm(task?.id, title.trim().charAt(0).toLocaleUpperCase() + title.trim().slice(1), detail.trim().charAt(0).toLocaleUpperCase() + detail.trim().slice(1));
    onHide();
  };

  return (
    <ModalStyled show={!!show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nueva Tarea</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              as="textarea"
              value={detail}
              onChange={e => setDetail(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
            <ButtonStyled variant="secondary" onClick={onHide}>Cancelar</ButtonStyled>
            <ButtonStyled type="submit">Guardar</ButtonStyled>
          </div>
        </Form>
      </Modal.Body>
    </ModalStyled>
  );
}