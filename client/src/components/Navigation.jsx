import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';

import { Container, Form, Nav, Navbar, NavLink } from 'react-bootstrap';
import { LoginButton, LogoutButton } from './Auth';
import styles from './navigation.module.css';


const Navigation = ({user, loggedIn, logout}) => {

  return (
    <>
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container className={styles.navbarContainer}>
        <Navbar.Brand as={NavLink} to="/">YourBrand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={styles.navLink}>
              Edit
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className={styles.navLink}>
              History
            </Nav.Link>
          </Nav>
        <Navbar.Text className="mx-2">
          {user && user.name && `Welcome, ${user.name}!`}
        </Navbar.Text>
        <Form className="mx-2">
          {loggedIn ? <LogoutButton logout={logout} /> : <LoginButton />}
        </Form>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    
  </>
  );
}

export { Navigation };

