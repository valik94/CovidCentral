import './index.scss'
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import axios from "axios";
// import NavigationBar from './components/NavigationBar';
// import Navbar from './components/NavigationBar';
// import NavCarousel from './components/NavCarousel';
// import Form from './components/Form';
import HomePage from './HomePage'
import Practitioners from './Practitioners'

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path='/' element={<HomePage/>} />
        <Route path='/practitioners' element={<Practitioners />} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;

    // <div className="App">
    //     <NavigationBar/>
    //     <Navbar/>
    //     <NavCarousel/>
    //     <Form/>
    // </div>