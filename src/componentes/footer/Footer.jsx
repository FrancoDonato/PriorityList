import React from 'react'
import { styled } from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--nav-bg);
  padding: 1rem;
  width: 100%;
  height: 20vh;
  color: var(--text);
  text-align: center;
`

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 PriorityList. Todos los derechos reservados.</p>
      <p>Software support.</p>
    </FooterContainer>
  )
}

export default Footer