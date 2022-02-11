import './index.scss'
import Navbar from './components/Navbar';
import NavCarousel from './components/NavCarousel';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <NavCarousel/>
        <Form/>
    </div>
  );
}

export default App;
