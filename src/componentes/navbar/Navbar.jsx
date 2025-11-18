import React, { useState, useEffect } from 'react'
import {styled} from 'styled-components'
import Login from '../login/Login'
import Button from 'react-bootstrap/Button';

const Contenedor = styled.div`
width: 100%;
height: 20vh;
padding: 1rem;
display: flex;
position: fixed;
z-index: 1000;
align-items: center;
justify-content: space-around;
background-color: var(--nav-bg);
transition: background-color 200ms ease;
box-shadow: var(--shadow-cardContainer-bg);
`

const Logo = styled.img`
    height: auto;
    width: 3rem;
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
        <Logo src="./DN.ico" alt="logo" />
          <h2>PriorityList</h2>
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