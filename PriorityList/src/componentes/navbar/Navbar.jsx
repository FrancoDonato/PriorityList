import React from 'react'
import {styled} from 'styled-components'
import Login from '../botones/Login'


const Contenedor = styled.div`
width: 100%;
height: 14vh;
display: flex;
justify-content: space-between;
background-color: #151B2B;
`

const Botones = styled.div`
display: flex;
padding: 1rem;
width: 15%;
color: aliceblue;
`

const LogBoton = styled.button`
    background-color: #1F283D;
    color: aliceblue;
`


const Navbar = () => {
  return (
    <Contenedor>
        <img src="" alt="" />
        <Login></Login>
    </Contenedor>
  )
}

export default Navbar