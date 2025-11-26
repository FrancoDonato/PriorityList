import React from 'react'
import Navbar from '../componentes/navbar/Navbar'
import { styled } from "styled-components"
import Footer from '../componentes/footer/Footer'
import Buscador from '../componentes/buscador/Buscador'
import ListaTareasAdmin from '../componentes/historial/ListaTareasAdmin'

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

const HistorialAdmin = () => {
  return (
     <>
    <Navbar />
    <BodyContainer>
    <Buscador></Buscador>
        <h2>Historial de Administrador</h2>
    <ListaTareasAdmin />
    </BodyContainer>
    <Footer />
    </>

  )
}

export default HistorialAdmin