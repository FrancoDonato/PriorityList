import React from 'react'
import Navbar from '../componentes/navbar/Navbar'
import ContenedorCards from '../componentes/contenedorCards/ContenedorCards'
import { styled } from "styled-components"
import StateList from '../componentes/stateList/StateList'
import Footer from '../componentes/footer/Footer'

const BodyContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 25vh;
    gap:2rem;
    display: flex;
    background-color: var(--bg) !important;
    color: var(--text) !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TituloEstilado = styled.h3`
    width: 60%;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
`

const ParrafoEstilado = styled.p`
    width: 40%;
    justify-content: center;
    text-align: center;
    font-size: 1.2rem;
`

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <BodyContainer>
                <TituloEstilado>Organizar tus tareas en tarjetas
                personalizadas, gestiona tus pendientes y colabora
                de forma eficiente.</TituloEstilado>
                <ParrafoEstilado>Inicia sesión para crear,
                editar y clasificar tus tareas, y accede a
                funciones avanzadas según tu rol de usuario. 
                <strong>¡Optimiza tu productividad y mantén tus proyectos bajo 
                control con PriorityList!</strong> 
                </ParrafoEstilado>
            </BodyContainer>
            <Footer></Footer>
        </>
    )
}

export default Home