import React from 'react'
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styled from 'styled-components';

const GrupoEstado = styled(ToggleButtonGroup)`
display:flex;
width: 40%;
justify-content: center;
flex-wrap: wrap;
gap: 1rem;
`

function StateList() {
  const [value, setValue] = useState([0, 0]);
  const handleChange = (val) => setValue(val);

  return (
      
      <GrupoEstado type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton variant='outline-secondary' id="tbg-btn-1" style={{borderRadius:'8px'}} value={1}>
         Asignadas
      </ToggleButton>
      <ToggleButton variant='outline-success' id="tbg-btn-2" style={{borderRadius:'8px'}} value={2}>
         Finalizadas
      </ToggleButton>
      <ToggleButton variant='outline-warning' id="tbg-btn-3" style={{borderRadius:'8px'}} value={3}>
         En proceso
      </ToggleButton>
      <ToggleButton variant='outline-danger' id="tbg-btn-4" style={{borderRadius:'8px'}} value={4}>
         Alta prioridad
      </ToggleButton>
    </GrupoEstado>

  );
}

export default StateList