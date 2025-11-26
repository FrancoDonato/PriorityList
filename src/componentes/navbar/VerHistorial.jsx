import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const BotonHistorial = styled(Button)`
  background-color: var(--button-bg) !important;
  color: var(--button-text) !important;
  border: 1px solid rgba(0,0,0,0.08) !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;

    &:hover {
      background-color: var(--button-hover-bg) !important;
    }
`;

const VerHistorial = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

    const isHistorial = location.pathname === '/HistorialUser' || location.pathname === '/HistorialAdmin';


  const handleClick = () => {
    if(isHistorial){
      navigate('/');
    } else if (user?.role === 'admin') {
      navigate('/HistorialAdmin');
    } else {
      navigate('/HistorialUser');
    }
  };

  return (
    <BotonHistorial onClick={handleClick}>
      {isHistorial ? `Home` : `Historial`}
    </BotonHistorial>
  );
};

export default VerHistorial;