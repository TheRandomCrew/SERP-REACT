import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'

const NavBarView = () => {
    return (
        <Navbar id='nav' fixed="top" collapseOnSelect expand="sm" bg="info" variant="dark" xs='12' sm='12' lg="10">
            <Navbar.Brand to="/">
                <b>KeyWord Tool</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        Ranking Palabras Clave
                    </Nav.Link>
                    <Nav.Link>
                        Articulos
                    </Nav.Link>
                    <Nav.Link>
                        Ranking Palabras Clave
                    </Nav.Link>
                    <Nav.Link  eventKey={1} to="/features">
                        Caracteristicas
                    </Nav.Link>
                    <Nav.Link>
                        Ranking Palabras Clave
                    </Nav.Link>
                    <Nav.Link eventKey={2} to="/pricing">Precios</Nav.Link>
                    <Nav.Link eventKey={3} >Contacto</Nav.Link>
                </Nav>
                {/* <Nav>
                    <Nav.Link as={NavLink} eventKey={1} to="/features">Caracteristicas
                    </Nav.Link>
                    <Nav.Link eventKey={2} as={NavLink} to="/pricing">Planes</Nav.Link>
                    <Nav.Link eventKey={3} href="#about">Conocenos</Nav.Link>                    
                </Nav> */}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBarView
