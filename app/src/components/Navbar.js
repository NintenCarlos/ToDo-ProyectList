import React from 'react'
import { Navbar } from 'react-bootstrap'

const NavbarHome = () => {
  return (
    <div>
      <Navbar className="navbarDashboard">
        <Navbar.Brand className="navbarBrand">To Do List</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end ">
          <Navbar.Text>
            <a href="/" className="signOut">
              Cerrar Sesión
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarHome
