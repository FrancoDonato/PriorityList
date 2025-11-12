import React from 'react'
import { styled } from 'styled-components'
import Cards from '../cards/Cards'

const CardsContainer = styled.div`
  width: 70%;
  height: 70vh;
  margin-bottom: 2rem;
  gap: 2rem;
  padding: 2rem;
  padding-right: 16px; /* reserva espacio para la scrollbar interior */
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: var(--cardContainer-bg);
  box-shadow: var(--shadow-cardContainer-bg);
  position: relative; /* necesario para el pseudo-elemento que dibuja el track */

  /* pseudo-elemento que actúa como "track" redondeado */
  &::before {
    content: '';
    position: absolute;
    top: 12px;               /* ajustar para que no toque los extremos */
    bottom: 12px;
    right: 8px;              /* centrar respecto a la scrollbar */
    width: 8px;              /* mismo ancho que el thumb menos el border */
    background: rgba(0,0,0,0.0);
    border-radius: 999px;
    pointer-events: none;    /* no interfiere con el scroll */
    z-index: 0;
  }

  /* WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: transparent;
  }

  /* dejar el track nativo transparente para que se vea el ::before */
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

  /* esquina (cuando hay scroll tanto horizontal como vertical) */
  &::-webkit-scrollbar-corner {
    background: transparent;
    border-radius: 999px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb, rgba(0,0,0,0.18)) transparent;
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