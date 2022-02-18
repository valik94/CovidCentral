import "./index.scss";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import axios from "axios";
import {useState} from 'react';
// import NavigationBar from './components/NavigationBar';
// import Navbar from './components/NavigationBar';
// import NavCarousel from './components/NavCarousel';
// import Form from './components/Form';
import HomePage from "./HomePage";
import Practitioners from "./Practitioners";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Patient from "./components/patient/Patient";

//app 1st load > check localstorage for a user session > user session should have the user ID 
//> if there is a user session > make request to back end and to fetch user data and set in state

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" element={<HomePage />} />
          <Route path="/practitioners" element={<Practitioners user={user}/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/patients/:id" element={<Patient />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
