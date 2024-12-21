import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Row, Container, NavDropdown  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'


function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch();

  const logoutHandler = () =>{
    dispatch(logout())
  }

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
            
            {userInfo ? (
              <NavDropdown title = {userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              ) : (
              <LinkContainer to="/login">
                <Nav.Link ><i className="fa-solid fa-user"> Login</i></Nav.Link>
              </LinkContainer>
          )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
