import React from "react";
import './navbar.scss'

export default function Navbar (props) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
      <a className="navbar-brand logo-size" href="#">
      <img src="./images/logo.png" alt="logo" width="30%" height="30%"/>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">Covid Test / Vaccination</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">Covid Statistics</a>
          </li>
          <li class="nav-item active">
            <a type="button" href="#" class="button-18">Login</a>
          </li>
          <li class="nav-item active">
            <a type="button" href="#" class="button-18">Sing-up</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}


 