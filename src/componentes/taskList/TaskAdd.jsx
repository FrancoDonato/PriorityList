import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import { styled } from 'styled-components'

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

function TaskAdd({ onAdd }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    const formatted = text.charAt(0).toUpperCase() + text.slice(1);
    if (typeof onAdd === 'function') onAdd(formatted);
    setValue('');
    setShow(false);
  };

  return (
    <div ref={ref}>
      <Button onClick={handleClick}>Agregar tarea</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <PopoverContainer id="popover-contained">
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
              <Button type="submit" size="sm" variant="primary">+</Button>
            </Form>
          </Popover.Body>
        </PopoverContainer>
      </Overlay>
    </div>
  );
}

export default TaskAdd