import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components'

const LoginBtn = styled(Button)`
  background-color: var(--button-bg) !important;
  color: var(--button-text) !important;
  border: 1px solid rgba(0,0,0,0.08) !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
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

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <LoginBtn variant="dark" onClick={handleShow}>
        Iniciar sesion
      </LoginBtn>

      <ModalStyled show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese sus credenciales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group 
            className="mb-3" 
            controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type='Password'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClose}>
            Ingresar
          </Button>
        </Modal.Footer>
      </ModalStyled>
    </>
  );
}

export default Login;