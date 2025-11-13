import React from 'react';
import Button from 'react-bootstrap/Button';
import { styled } from 'styled-components';

const ActionGroup = styled.div`
  display: inline-flex;
  gap: .35rem;
  align-items: center;
`;

const ActionBtn = styled(Button)`
  padding: .2rem .45rem;
  font-size: .85rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 30px;
  background-color: var(--button-bg) !important;
  color: var(--button-text) !important;
  border: 1px solid rgba(0,0,0,0.06) !important;
`;

export default function TaskActions({ index, isDone = false, onComplete, onEdit, onState, onDelete }) {
  return (
    <ActionGroup>
      <ActionBtn
        size="sm"
        title={isDone ? 'Deshacer' : 'Completar'}
        onClick={() => onComplete(index)}
        aria-label={`${isDone ? 'Deshacer' : 'Completar'} ${index}`}
      >
        <i className={isDone ? 'bi bi-arrow-counterclockwise' : 'bi bi-check-lg'}></i>
      </ActionBtn>

      <ActionBtn size="sm" title="Ver" onClick={() => onState(index)} aria-label={`Ver ${index}`}>
        <i class="bi bi-exclamation-triangle"></i>   
      </ActionBtn>

      <ActionBtn size="sm" title="Editar" onClick={() => onEdit(index)} aria-label={`Editar ${index}`}>
        <i className="bi bi-pencil"></i>
      </ActionBtn>

      <ActionBtn size="sm" title="Eliminar" onClick={() => onDelete(index)} aria-label={`Eliminar ${index}`}>
        <i className="bi bi-trash"></i>
      </ActionBtn>
    </ActionGroup>
  );
}