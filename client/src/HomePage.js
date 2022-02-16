import NavigationBar from './components/NavigationBar';
import NavCarousel from './components/NavCarousel';
import Patient from './components/patientsList/Patient';

export default function HomePage () {
  
  return (
    <div className="App">
      <NavigationBar/>
      <NavCarousel/>
      <Patient/>

    </div>
  );
}








