import React from 'react'
import { styled } from 'styled-components'
import Cards from '../cards/Cards'


const CardsContainer = styled.div`
  width: 80%;
  height: 70vh;
  margin-bottom: 2rem;
  gap: 2rem;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: var(--cardContainer-bg);
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