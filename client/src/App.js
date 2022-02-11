import './index.scss'
import Navbar from './components/Navbar';
import NavCarousel from './components/NavCarousel';
import Registration from './components/Registration';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <NavCarousel/>
        <Registration/>
    </div>
  );
}

export default App;
