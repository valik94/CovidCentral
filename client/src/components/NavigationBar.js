import React from "react";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useLogout from "./useLogout.js";

export default function NavigationBar({ userID }) {
  console.log(userID);

  //custom hook logout
  const { logout } = useLogout();

  //display login/logout/registration dynamically
  const displayButtons = function (userStatus) {
    if (!userStatus) {
      return (
        <>
          <Nav.Item>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button>
              <Link to="/register">Register</Link>
            </Button>
          </Nav.Item>
        </>
      );
    }
    if (userStatus) {
      return (
        <>
          <Nav.Item>
            <Button>
              <Link to="/practitioners">Work Board</Link>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={logout}>Logout</Button>
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
              {/* <Nav.Item>
                <Button><Link to="/login">Login</Link></Button>
              </Nav.Item>

              <Nav.Item>
                <Button><Link to="/register">Register</Link></Button>
              </Nav.Item>

              <Nav.Item>
                <Button onClick ={logout}>Logout</Button>
              </Nav.Item> */}
              {displayButtons(userID)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
