import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import { styled } from 'styled-components';

const PopoverContainer = styled(Popover)`
  .popover-body{
      background-color: var(--card-bg);
      color: var(--text);
      display: flex;
      gap: 0.5rem;
      align-items: center;
  }
  .popover-header{
      background-color: var(--card-bg);
      color: var(--text);
  }
`;

export default function TaskAdd({ onAdd, card_id }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(prev => !prev);
    setTarget(event.target);
  };

  const handleAdd = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const text = (value ?? '').trim();
    if (!text || !card_id) return;
    if (typeof onAdd === 'function') onAdd({ title: text, card_id });
    setValue('');
    setShow(false);
  };

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      <Button onClick={handleClick}>Agregar tarea</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current || document.body}   
        onHide={() => setShow(false)}
        containerPadding={20}
      >
        <PopoverContainer id="popover-contained" onClick={(e) => e.stopPropagation()}>
          <Popover.Header as="h3">Escriba la tarea</Popover.Header>
          <Popover.Body>
            <Form onSubmit={handleAdd} style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <Form.Control
                size="sm"
                placeholder="Nueva tarea..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
              <Button type="submit" size="sm">+</Button>
            </Form>
          </Popover.Body>
        </PopoverContainer>
      </Overlay>
    </div>
  );
}