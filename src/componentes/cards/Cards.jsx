import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import {styled} from 'styled-components';
import CardsDetail from './CardsDetail';

const CardStyled = styled(Card)`
  background-color: var(--card-bg);
  color: var(--text);
  width: 12rem;
  height: 8rem;
`;


function Cards() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <CardStyled>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Button onClick={handleShow} style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}>
            Ver detalle
          </Button>
        </Card.Body>
      </CardStyled>

      <CardsDetail show={show} onHide={handleClose} />
    </>
  );
}

export default Cards