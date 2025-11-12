import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';

const GrupoBuscador = styled(InputGroup)`
  width: 40%;
`

function Buscador() {
  return (
         <GrupoBuscador>
        <Form.Control
          placeholder="Buscar por Card..."
          aria-label="Buscador por nombre de card"
        />
        <Button variant="dark"><i class="bi bi-search"></i></Button>
        <Button variant="dark"><i class="bi bi-x-circle"></i></Button>
      </GrupoBuscador>
    
  );
}

export default Buscador;