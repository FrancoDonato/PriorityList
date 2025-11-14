import React, { useState } from 'react'
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
`

const ButtonStyled = styled(Button)`
  background-color: var(--button-bg);
  color: var(--text);
  border: none;

  &:hover {
    background-color: var(--button-bg-hover);
    color: var(--text);
  }
`;
function Cards({ card, deleteCard, editCard }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(card?.title || 'Card Title');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    if (typeof deleteCard === 'function') deleteCard(card.id);
  };

  const handleEdit = () => {
    const newTitle = window.prompt('Editar título', title);
    if (newTitle && typeof editCard === 'function') {
      setTitle(newTitle);
      editCard(card.id, { title: newTitle });
    }
  };

  return (
    <>
      <CardStyled>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ButtonGroup>
            <ButtonStyled onClick={handleShow} >  
              <i class="bi bi-eye"></i>
            </ButtonStyled>
            <ButtonStyled onClick={handleEdit}>
              <i class="bi bi-pencil-square"></i>
            </ButtonStyled>
            <ButtonStyled onClick={handleDelete}>
              <i class="bi bi-trash3-fill"></i>
            </ButtonStyled>
          </ButtonGroup>
        </Card.Body>
      </CardStyled>

      <CardsDetail 
       show={show} 
       onHide={handleClose}
       title={title} />
    </>
  );
}

export default Cards