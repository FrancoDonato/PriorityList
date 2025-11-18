import { useState } from 'react';
import { styled } from 'styled-components';
import Cards from '../cards/Cards';
import AddCards from '../cards/AddCards';
import useCards from '../../hooks/useCards';
import ModalTitle from '../modals/ModalTitle';
import ModalDeleteCards from '../modals/ModalDeleteCards';
import EditCardModal from '../modals/EditCardModal';

export const CardsContainer = styled.div`
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
  const { cards, addCard, deleteCard, editCard } = useCards();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleRequestDelete = (id) => {
    const card = cards.find(c => c.id === id) ?? null;
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setCardToDelete(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = (id) => {
    deleteCard(id);
    handleCancelDelete();
  };

  const handleRequestEdit = (id) => {
    const c = cards.find(x => x.id === id) ?? null;
    setCardToEdit(c);
    setShowEditModal(true);
  };

  const handleConfirmEdit = (id, newTitle) => {
    editCard(id, { title: newTitle });
  };

  const handleCloseEdit = () => {
    setCardToEdit(null);
    setShowEditModal(false);
  };

  return (
    <>
      <CardsContainer>
        {cards === null ? (
          <p>Para ver las cards debe iniciar sesión.</p>
        ) : cards.length === 0 ? (
          <>
            <AddCards addCard={handleOpenModal} />
            <p>No hay cards disponibles.</p>
          </>
        ) : (
          <>
            <AddCards addCard={handleOpenModal} />

        {cards.map(card => (
            <Cards
              key={card.id}
              card={card}
              onRequestEdit={handleRequestEdit}
              onRequestDelete={handleRequestDelete}
              editCard={editCard}
            />
            ))}
          </>
        )}
      </CardsContainer>
      <ModalTitle
        addCard={addCard}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      <ModalDeleteCards
        show={showDeleteModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        card={cardToDelete}
      />
      <EditCardModal
        show={showEditModal}
        onHide={handleCloseEdit}
        onConfirm={handleConfirmEdit}
        card={cardToEdit}
      />
    </>
  );
};

export default ContenedorCards