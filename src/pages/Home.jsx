import React from 'react'
import Navbar from '../componentes/navbar/Navbar'
import { styled } from "styled-components"
import Buscador from '../componentes/buscador/Buscador'
import StateList from '../componentes/stateList/StateList'

const BodyContainer = styled.div`
    width: 100%;
    height: 80vh;
    gap:3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Home = () => {
    return (
        <>
            <Navbar></Navbar>

            <BodyContainer>


                <Buscador></Buscador>
                <StateList></StateList>

            </BodyContainer>

            <p>Pantalla home</p>

        </>

    )
}

export default Home