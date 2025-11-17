import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';

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

  // estado credenciales
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // auth
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();

  // si ya está logueado puedes ocultar el botón o cambiar el texto
  // (opcional: return null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username.trim(), password);
    if (ok) {
      setPassword('');
      navigate('/admin'); // redirige al admin
    }
  };

  return (
    <>
      {!user && (
        <LoginBtn variant="dark" onClick={handleShow}>
          Iniciar sesión
        </LoginBtn>
      )}
      {user && (
        <LoginBtn variant="dark" disabled>
          Sesión: {user.username}
        </LoginBtn>
      )}

      <ModalStyled show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese sus credenciales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </Form.Group>

            {error && (
              <div style={{ color: 'var(--danger, #e53935)', fontSize: 12, marginBottom: 8 }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button
                variant="secondary"
                type="button"
                onClick={handleClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading || !username || !password}
              >
                {loading ? 'Entrando...' : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </ModalStyled>
    </>
  );
}

export default Login;