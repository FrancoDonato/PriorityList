import React from 'react'
import { styled } from 'styled-components'
import Cards from '../cards/Cards'


const CardsContainer = styled.div`
  width: 70%;
  height: 70vh;
  margin-bottom: 2rem;
  gap: 2rem;
  padding: 2rem;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: var(--cardContainer-bg);
  box-shadow: var(--shadow-cardContainer-bg);
/* WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 10px;               /* ancho de la barra */
    height: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: var(--scrollbar-track, transparent);
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb, rgba(0,0,0,0.18));
    border-radius: 16px;
    border: 1px solid var(--scrollbar-track, transparent); /* espacio alrededor del thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover, rgba(0,0,0,0.28));
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb, rgba(0,0,0,0.18)) var(--scrollbar-track, transparent);
`

const ContenedorCards = () => {
  return (
    <CardsContainer>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
    </CardsContainer>
  )
}

export default ContenedorCards