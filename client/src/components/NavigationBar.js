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
          <Nav.Item>
            <Button>
              <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/login">Login</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button>
              <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/register">Register</Link>
            </Button>
          </Nav.Item>
        </>
      );
    }
    if (loggedIn) {
      return (
        <>
          <Nav.Item>
            <Button>
              <Link style={{ textDecoration: 'none', color: '#0f003d' }} to="/practitioners">Work Board</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button sx={{ color: '#0f003d' }} onClick={completeLogout}>Logout</Button>
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
