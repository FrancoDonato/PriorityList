import React from 'react'
import Navbar from '../componentes/navbar/Navbar'
import ContenedorCards from '../componentes/contenedorCards/ContenedorCards'
import { styled } from "styled-components"
import Buscador from '../componentes/buscador/Buscador'
import StateList from '../componentes/stateList/StateList'
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

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <BodyContainer>
                <StateList></StateList>
                <ContenedorCards></ContenedorCards>
            </BodyContainer>
            <Footer></Footer>
        </>
    )
}

export default Home