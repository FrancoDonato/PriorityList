import React from 'react'
import { Navbar } from 'react-bootstrap'
import Footer from '../componentes/footer/Footer'

const BodyContainer = styled.div`
    width: 100%;
    height: 120vh;
    padding-top: 25vh;
    gap:2rem;
    display: flex;
    background-color: var(--bg) !important;
    color: var(--text) !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const HistorialUser = () => {
  return (
    <>
    <Navbar />
    <BodyContainer>
        <h2>Historial de Usuario</h2>
    </BodyContainer>
    <Footer />
    </>

  )
}

export default HistorialUser