import React from 'react'
import { Navbar, Nav, Row, Container  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Horizon</Navbar.Brand>
        </LinkContainer>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
            <LinkContainer to="/cart">
              <Nav.Link ><i className="fa-solid fa-cart-shopping"> Cart</i></Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/login">
              <Nav.Link ><i className="fa-solid fa-user"> Login</i></Nav.Link>
            </LinkContainer>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
