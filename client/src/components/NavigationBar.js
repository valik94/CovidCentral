import React from "react";
import './navbar.scss'
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function NavigationBar (props) {

  let navigateBar = useNavigate();

  const logout = function() {
    axios.post("/api/logout").then( () => {
      localStorage.removeItem("userLastName")
      localStorage.removeItem("userID")
      localStorage.removeItem("userSpecialty")  
      navigateBar("/");
     })

  } //update to POST instead of GET
  
  return (
    <>
      <Navbar bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./images/logo.png"
              
              className="d-inline-block align-center"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav variant="pills">
              <Nav.Item>
                <Button>
                <Link to="/login">Login</Link></Button>
              </Nav.Item>
              <Nav.Item>
                <Button><Link to="/register">Register</Link></Button>
              </Nav.Item>
              <Nav.Item>
                <Button onClick ={logout}>Logout</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
