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
      <h5>© 2025 PriorityList. Todos los derechos reservados.</h5>
      <h6>Franco Gonzalez. Software support. DN Argentina</h6>
    </FooterContainer>
  )
}

export default Footer