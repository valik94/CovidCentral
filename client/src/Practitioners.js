import "./components/practitionersComp/practitioners.scss";
import classNames from "classnames";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./components/calendar/Calendar";
import PatientsList from "./components/patientsList/PatientsList";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "./components/useLogout.js"


export default function HomePage({userID}) {
  
  //custom hook logout
  const { logout } = useLogout();

  const [state, setState] = useState({
    patients: true,
    calendar: false,
  });

  const [practitionerLastName, setPractitionerLastName] = useState("")
  const [practitionerSpeciatly, setPractitionerSpeciatly]= useState("")

  //changing the state is button selected
  const setPatients = (patients) =>
    setState({ patients: patients, calendar: false });
  const setCalendar = (calendar) =>
    setState({ patients: false, calendar: calendar });

  //change button class if selected
  const clickedCalendar = classNames("sidebar__secondFont", {
    "sidebar__secondFont clicked": state.calendar,
  });
  const clickedPatient = classNames("sidebar__secondFont", {
    "sidebar__secondFont clicked": state.patients,
  });

  //helper function allowing the render different components based on the button selected
  function getOption(state) {
    if (state.patients === true) {
      return <PatientsList />;
    } else if (state.calendar === true) {
      return <Calendar />;
    }
  }

  const getState = getOption(state);

  //Axios request to fetch the practitioner information
  useEffect(() => {
    axios
      .get(`/api/practitioners/${userID}`)
      .then((response) => {
        setPractitionerLastName(response.data.last_name)
        setPractitionerSpeciatly(response.data.specialty)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userID]);


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
            <p className="sidebar__mainFont">
              Hello {practitionerSpeciatly} {practitionerLastName}
            </p>
          </div>
          <div className="">
            <button
              className={clickedPatient}
              onClick={() => {
                setPatients(true);
              }}
            >
              Patients
            </button>
          </div>
          <div className="">
            <button
              className={clickedCalendar}
              onClick={() => {
                setCalendar(true);
              }}
            >
              Calendar
            </button>
          </div>
          <div className="sidebar__backButton">
            <button className="button-logout-navbar-practitioners" onClick ={logout}>
              <LogoutIcon /> Logout
            </button>
          </div>
        </nav>
      </section>
      <section className="schedule">{getState}</section>
    </main>
  );
}