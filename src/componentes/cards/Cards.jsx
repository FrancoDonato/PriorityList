import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { styled } from 'styled-components';
import CardsDetail from './CardsDetail';
import ModalDeleteCards from '../modals/ModalDeleteCards';
import ModalTitle from '../modals/ModalTitle';

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

function Cards({ card, deleteCard, onRequestDelete, onRequestEdit }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState(card?.title || 'Card Title');

  useEffect(() => {
    setTitle(card?.title || 'Card Title');
  }, [card?.title]);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseTitle = () => setShowTitle(false);
  const handleShowTitle = () => setShowTitle(true);

  const handleDelete = () => {
    handleShowDelete();
    if (typeof onRequestDelete === 'function') {
      onRequestDelete(card.id);
      return;
    }
    if (typeof deleteCard === 'function') deleteCard(card.id);
  };

  const handleEdit = () => {
    handleShowTitle();
    if (typeof onRequestEdit === 'function') {
      onRequestEdit(card.id);
      return;
    }
  };

  return (
    <>
      <CardStyled>
        <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Card.Title style={{ marginBottom: 8 }}>{title}</Card.Title>
          <ButtonGroup>
            <ButtonStyled onClick={handleShowDetail}><i className="bi bi-eye-fill"></i></ButtonStyled>
            <ButtonStyled onClick={handleEdit}><i className="bi bi-pen"></i></ButtonStyled>
            <ButtonStyled onClick={handleDelete}><i className="bi bi-trash3-fill"></i></ButtonStyled>
          </ButtonGroup>
        </Card.Body>
      </CardStyled>

      <CardsDetail show={showDetail} onHide={handleCloseDetail} card={card} />
      <ModalDeleteCards show={showDelete} onHide={handleCloseDelete} title={title} />
      <ModalTitle show={showTitle} onHide={handleCloseTitle} title={title} />
    </>
  );
}

export default Cards;