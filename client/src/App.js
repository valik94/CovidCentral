import './index.scss'
import NavigationBar from './components/Navbar';
import Navbar from './components/Navbar';
import NavCarousel from './components/NavCarousel';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
        <NavigationBar/>
        <Navbar/>
        <NavCarousel/>
        <Form/>
    </div>
  );
}

export default App;
