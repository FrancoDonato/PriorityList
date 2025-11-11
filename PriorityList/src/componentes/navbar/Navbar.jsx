import React from 'react'
import {styled} from 'styled-components'
import Login from '../botones/Login'
import Button from 'react-bootstrap/Button';


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

const LogBoton = styled.div`
    background-color: #151B2B;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`


const Navbar = () => {
  return (
    <Contenedor>
        <img src="" alt="" />
        <LogBoton>
        <Button variant="dark"><i class="bi bi-moon"></i></Button>
        <Login></Login>
        </LogBoton>

    </Contenedor>
  )
}

export default Navbar