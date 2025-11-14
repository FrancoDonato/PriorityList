import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { styled } from 'styled-components';
import CardsDetail from './CardsDetail';

const CardStyled = styled(Card)`
  background-color: var(--card-bg);
  color: var(--text);
  width: 12rem;
  height: 8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
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

function Cards({ card, deleteCard, editCard, onRequestDelete, onRequestEdit }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(card?.title || 'Card Title');

  useEffect(() => {
    setTitle(card?.title || 'Card Title');
  }, [card?.title]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    if (typeof onRequestDelete === 'function') {
      onRequestDelete(card.id);
      return;
    }
    if (typeof deleteCard === 'function') deleteCard(card.id);
  };

  const handleEdit = () => {
    // preferir abrir el modal via onRequestEdit (padre)
    if (typeof onRequestEdit === 'function') {
      onRequestEdit(card.id);
      return;
    }
    // fallback: prompt sólo si no hay handler del padre
   
  };

  return (
    <>
      <CardStyled>
        <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Card.Title style={{ marginBottom: 8 }}>{title}</Card.Title>
          <ButtonGroup>
            <ButtonStyled onClick={handleShow}><i class="bi bi-eye-fill"></i></ButtonStyled>
            <ButtonStyled onClick={handleEdit}><i class="bi bi-pen"></i></ButtonStyled>
            <ButtonStyled onClick={handleDelete}><i class="bi bi-trash3-fill"></i></ButtonStyled>
          </ButtonGroup>
        </Card.Body>
      </CardStyled>

      <CardsDetail show={show} onHide={handleClose} title={title} />
    </>
  );
}

export default Cards;