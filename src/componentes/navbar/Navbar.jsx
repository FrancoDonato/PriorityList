import React, { useState, useEffect } from 'react'
import {styled} from 'styled-components'
import Login from '../botones/Login'
import Button from 'react-bootstrap/Button';

const Contenedor = styled.div`
width: 100%;
height: 20vh;
display: flex;
justify-content: space-between;
background-color: var(--nav-bg);
transition: background-color 200ms ease;
`

const LogBoton = styled.div`
    background-color: transparent;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`


const Navbar = () => {

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Contenedor>
        <img src="" alt="logo" />
        <LogBoton>
            <Button variant={theme === 'dark' ? 'dark' : 'light'} onClick={toggleTheme}>
              <i className={theme === 'dark' ? 'bi bi-moon' : 'bi bi-sun'}></i>
            </Button>        
            <Login />
        </LogBoton>
    </Contenedor>
  )
}

export default Navbar