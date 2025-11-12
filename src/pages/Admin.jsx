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
                <p>Pantalla admin</p>
            </BodyContainer>
        </>
    )
}

export default Admin