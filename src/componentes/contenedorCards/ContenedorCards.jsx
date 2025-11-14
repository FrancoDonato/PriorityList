import React from 'react';
import { styled } from 'styled-components';
import Cards from '../cards/Cards';
import AddCards from '../cards/AddCards';
import useCards from '../../hooks/useCards';

const CardsContainer = styled.div`
  width: 70%;
  height: 70vh;
  margin-bottom: 2rem;
  gap: 2rem;
  padding: 2rem;
  padding-right: 16px;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: var(--cardContainer-bg);
  box-shadow: var(--shadow-cardContainer-bg);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 12px;
    bottom: 12px;
    background: var(--scrollbar-track, rgba(0,0,0,0.04));
    border-radius: 999px;
    pointer-events: none;
    z-index: 0;
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb, rgba(0,0,0,0.18));
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: padding-box;
    z-index: 1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover, rgba(0,0,0,0.28));
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
    border-radius: 999px;
  }

  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb, rgba(0,0,0,0.18)) transparent;
`

const ContenedorCards = () => {
  const { cards, addCard, deleteCard, editCard } = useCards([
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
  ]);

  return (
    <>
      <CardsContainer>
        <AddCards addCard={addCard} />
        {cards.map(card => (
          <Cards
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            editCard={editCard}
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default ContenedorCards