import "./index.scss";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
// import NavigationBar from './components/NavigationBar';
// import Navbar from './components/NavigationBar';
// import NavCarousel from './components/NavCarousel';
// import Form from './components/Form';
import HomePage from "./HomePage";
import Practitioners from "./Practitioners";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Patient from "./components/patient/Patient";

function App() {
  
  //State keeping track if user logged in
  const [loggedIn, setLoggedIn] = useState(localStorage.userID)

  return ( 
    <Router>
      <div>
        <Switch>
          <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
          <Route path="/register" element={<Registration setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          {loggedIn && (<Route path="/patients/:id" element={<Patient userID={localStorage.userID} />} />)}
          {/* <Route path="/patients/:id" element={<Patient userID={localStorage.userID} />} /> */}
          {loggedIn && (<Route path="/practitioners" element={<Practitioners userID={localStorage.userID} setLoggedIn={setLoggedIn}/> } /> )}
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
