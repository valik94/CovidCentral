import Kalend, { CalendarView } from 'kalend' // import component
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'kalend/dist/styles/index.css'; // import styles
import DisplayEventForm from './DisplayEventForm.js';
import DisplayEventItem from './DisplayEventItem.js';


export default function Calendar() {
  //Initializing states
  const [events, setEvents] = useState([])
  const [patientInfo, setPatientInfo] = useState([])
  const [displayItem, setDisplayItem] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [dataItem, setDataItem] = useState({})

  const onEventClick = (data) => {
    setDisplayItem(true)
    setDisplayForm(false)
    setDataItem(data)
  };

  const onNewEventClick = (data) => {
    setDisplayItem(false)
    setDisplayForm(true)
  };

  useEffect(() => {
    axios.get("/api/practitioners")
      .then(response => {
        setEvents(response.data.appointments)
        setPatientInfo(response.data.patients)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);


  return (
    <section className="calendar-main">
      <Kalend
        onEventClick={onEventClick}
        onNewEventClick={onNewEventClick}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        disabledViews={[CalendarView.DAY]}
        // onSelectView={selectedView}
        //selectedView={selectedView}
        // onPageChange={onPageChange}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'en'}
      />
      {displayItem ? <DisplayEventItem dataItem={dataItem} patientInfo={patientInfo} setDisplayItem={setDisplayItem} /> : " "}
      {displayForm ? <DisplayEventForm patientInfo={patientInfo} events={events} setEvents={setEvents}  setDisplayForm={setDisplayForm}/> : " "}
    </section>
  )
}

