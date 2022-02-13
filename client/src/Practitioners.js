import './components/practitionersComp/practitioners.scss'
import classNames from "classnames"
import { useState } from 'react'
import Calendar from './components/calendar/Calendar'
import PatientsList from './components/patientsList/PatientsList'

export default function HomePage (props) {
  const [ state, setState ] = useState({
    patients: true,
    calendar: false
  })

  //changing the state is button selected
  const setPatients = (patients) => setState({patients: patients, calendar: false})
  const setCalendar = (calendar) => setState({patients: false, calendar: calendar})

  //change button class if selected 
  const clickedCalendar = classNames('sidebar__secondFont', {
    "sidebar__secondFont clicked" : state.calendar
  })
  const clickedPatient = classNames('sidebar__secondFont', {
    "sidebar__secondFont clicked" : state.patients,
  })
  
  //helper function allowing the render different components based on the button selected 
  function getOption(state) {
    if (state.patients === true) {
      return (
        <PatientsList />
      )
    } else if (state.calendar === true) {
      return (
        <Calendar />
      )
    }
  }

  const getState = getOption(state)

  return (
    <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo1.png"
        alt="Interview Scheduler"
      />
      <nav className="sidebar__menu">
        <div className="sidebar__mainFont__background">
          <p className="sidebar__mainFont">Hello Dr. Alex</p>
        </div>
        <div className="">
          <button className={clickedPatient} onClick={() => {setPatients(true)}}> Patients </button>
        </div>
        <div className="">
          <button className={clickedCalendar} onClick={() => {setCalendar(true)}}> Calendar </button>
        </div>
        <div className="sidebar__lowerPart">
          <p>© dRecords 2022</p>
        </div>
      </nav>
    </section>
    <section className="schedule">
     {getState}
    </section>
  </main>
  );
}


// Example how to fetch information
// const [formIsSubmitted, setFormIsSubmitted] = useState(false);
// const submitForm = () => {
//   setFormIsSubmitted(true);
// };

// const getDummyData = async () => {
//   try {
//     const { data } = await axios.get("/practitioners");
//     console.log("CLOSE==================:", data)
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   // const data = getDummyData()
//   //axios.get("http://localhost:8080/practitioners")
//   fetch("/practitioners")
//   .then(response => {
//     console.log(response)
//   })

//   // console.log('DATA:', data)
// }, []);