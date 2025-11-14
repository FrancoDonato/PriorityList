import { useState } from 'react';

export default function useCards(initial = []) {
  const [cards, setCards] = useState(initial);
  const [activeCardId, setActiveCardId] = useState(null);

  const addCard = () => {
    const title = window.prompt('Ingrese el título de la nueva card', '');
    if (!title || !title.trim()) return;
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards(prev => [...prev, { id: newId, title: title.trim() }]);
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(card => card.id !== id));
    if (activeCardId === id) setActiveCardId(null);
  };

  const editCard = (id, newData) => {
    setCards(prev => prev.map(card => card.id === id ? { ...card, ...newData } : card));
  };

  const showCard = (id) => {
    setActiveCardId(id);
  };

  const hideCard = () => {
    setActiveCardId(null);
  };

  return {
    cards,
    addCard,
    deleteCard,
    editCard,
    activeCardId,
    showCard,
    hideCard,
  };
}