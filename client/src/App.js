import "./index.scss";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  
} from "react-router-dom";
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
import { useEffect } from "react";

//app 1st load > check localstorage for a user id > user session should have the user ID 
//> if there is a user id > make request to back end and to fetch user data and set in state

function App() {
  // const location = useLocation();
  // const history = useHistory();
  // const restrictedRoutes = ["/practitioners", "/patients/:id"];


  // eslint-disable-next-line no-undef
  // useEffect(() => {
  //   if (!user && restrictedRoutes.includes(location.pathname)) {
  //     history.replace("/login");
  //   }
  // }, [location.pathname]);

  // const [userID, setUserID] = useState(localStorage.userID)
  // const [userLastName, setUserLastName] = useState(localStorage.userLastName)
  // const [userSpecialty, setUserSpecialty] = useState(localStorage.userSpecialty)


  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" element={<HomePage />} />
          <Route path="/practitioners" element={<Practitioners userID={localStorage.userID} lastName={localStorage.userLastName} specialty={localStorage.userSpecialty}/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients/:id" element={<Patient userID={localStorage.userID}/>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
