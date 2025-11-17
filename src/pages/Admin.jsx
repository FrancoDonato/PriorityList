import React from 'react'
import Navbar from '../componentes/navbar/Navbar'
import { styled } from "styled-components"
import Buscador from '../componentes/buscador/Buscador'
import StateList from '../componentes/stateList/StateList'
import ContenedorCards from '../componentes/contenedorCards/ContenedorCards'
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

const Admin = () => {
    return (
        <>
            <Navbar></Navbar>
            <BodyContainer>

                <Buscador></Buscador>
                <StateList></StateList>
                <ContenedorCards></ContenedorCards>
                <Footer></Footer>
            </BodyContainer>
        </>
    )
}

export default Admin