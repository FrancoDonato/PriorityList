import { useState, useEffect } from 'react';
import { createCard, getCards, deleteCard as apiDeleteCard, editCard as apiEditCard } from '../api/client';

export default function useCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCards();
        setCards(data || []);
      } catch (e) {
        setCards(null);
        console.log("Debe iniciar sesion para ver las cards");
      }
    })();
  }, []);

  const addCard = async (title) => {
    if (!title || !title.trim()) return;
    try {
      const newCard = await createCard(title.trim().charAt(0).toUpperCase() + title.trim().slice(1));
      setCards(prev => [newCard, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCard = async (id) => {
    try {
      await apiDeleteCard(id);
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const editCard = async (id, newData) => {
    try {
      const updated = await apiEditCard(id, newData);
      setCards(prev => prev.map(card => card.id === id ? { ...card, ...updated } : card));
    } catch (e) {
      console.error(e);
    }
  };

  return { cards, addCard, deleteCard, editCard };
}