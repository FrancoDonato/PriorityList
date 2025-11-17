import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { styled } from 'styled-components';

const ModalStyled = styled(Modal)`
  .modal-content {
    background-color: var(--card-bg) !important;
    color: var(--text) !important;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: var(--shadow-modalTitle-bg);}
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
`

const ModalTitle = ({ addCard, showModal, handleCloseModal }) => {
    const [newTitle, setNewTitle] = useState('');

    const handleAddCard = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        if (typeof addCard === 'function') addCard(newTitle);
        setNewTitle('');
        handleCloseModal();
    };

    return (
        <ModalStyled show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar nueva Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddCard}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <ButtonStyled type="submit" className="mt-3">
                        Agregar
                    </ButtonStyled>
                </Form>
            </Modal.Body>
        </ModalStyled>
    );
};

export default ModalTitle;