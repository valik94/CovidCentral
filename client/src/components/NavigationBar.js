import React from "react";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useLogout from "./useLogout.js";

export default function NavigationBar(props) {
  const { setLoggedIn, loggedIn } = props;

  //custom hook logout
  const { logout } = useLogout();


  const completeLogout = function () {
    logout()
    setLoggedIn(false)
  }

  //display login/logout/registration dynamically
  const displayButtons = function () {
    if (!loggedIn) {
      return (
        <>
          <Nav.Item style={{padding:1}}>
            <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/login">
              <Button sx={{bgcolor: '#c5e060', color:'black', borderRadius: 7, mx:2, '&:hover':{bgcolor: '#0f003d', color:"white"}}}>Login</Button>
            </Link>
          </Nav.Item>
          <Nav.Item style={{padding:1}}>
            <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/register">
            <Button sx={{bgcolor: '#c5e060', color:'black', borderRadius: 7, '&:hover':{bgcolor: '#0f003d', color:"white"}}}>Register</Button>
            </Link>
          </Nav.Item>
        </>
      );
    }
    if (loggedIn) {
      return (
        <>
          <Nav.Item style={{padding:1}}>
            <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/practitioners">
            <Button sx={{bgcolor: '#c5e060', color:'black', borderRadius: 7, mx:2, '&:hover':{bgcolor: '#0f003d', color:"white"}}}>Work Board</Button>
            </Link>
          </Nav.Item>
          <Nav.Item style={{padding:1}}>
            <Button sx={{bgcolor: '#c5e060', color:'black', borderRadius: 7, '&:hover':{bgcolor: '#0f003d', color:"white"}}} onClick={completeLogout}>Logout</Button>
          </Nav.Item>
        </>
      );
    }
  };

  return (
    <>
      <Navbar bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./images/logo.png"
              className="d-inline-block align-center"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav variant="pills">
              {displayButtons()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
