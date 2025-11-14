import React from 'react';
import { styled } from 'styled-components';
import Card from 'react-bootstrap/Card';

const CardStyled = styled(Card)`
  background-color: var(--card-bg);
  color: var(--text);
  width: 12rem;
  height: 8rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled.button`
border: none;
width: 100%;
height: 100%;
font-size: 2.5rem;
color: var(--text);
background-color: transparent;

&:hover {
    transition: all 0.2s ease-in-out;
    background-color: var(--button-bg-hover);
    color: var(--text);
    font-size: 2.8rem;
}      
`
const AddCards = ({ addCard }) => {
  return (
    <CardStyled>
      <ButtonStyled onClick={addCard}><i class="bi bi-plus"></i></ButtonStyled>
    </CardStyled>
  );
};

export default AddCards;