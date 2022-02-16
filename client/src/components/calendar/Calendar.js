import Kalend, { CalendarView } from 'kalend' // import component
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'kalend/dist/styles/index.css'; // import styles
//import DisplayEvent from './DisplayEvent.js'
import DisplayEventForm from './DisplayEventForm.js'; 
import DisplayEventItem from './DisplayEventItem.js';

export default function Calendar (props) {
  const [events, setEvents] = useState([])
  //const [displayEvent, setDisplayEvent] = useState(false)
  const [patientInfo, setPatientInfo] = useState([])

  const [displayItem, setDisplayItem] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [dataItem, setDataItem] = useState({})
  //const [dataForm, setDataForm] = useState({})
  //Axios request to fetch the events in the calendar
  useEffect(() => {
    axios.get("/api/practitioners")
    .then(response => {
      setEvents(response.data.appointments) 
      setPatientInfo(response.data.patients)
    })
    .catch ((err) => {
      console.log(err.message);
    })
  }, []);


  //Allows to display more information about the event
  const onEventClick = (data) => {
    //setDisplayEvent(!displayEvent)
    setDisplayItem(true)
    setDisplayForm(false)
    setDataItem(data)
    // let displayItemData = data;
    // return displayItemData
  };

  const onNewEventClick = (data) => {
    //setDisplayEvent(!displayEvent)
    setDisplayItem(false)
    setDisplayForm(true)
    //setDataForm(data)
    //console.log(data)
  };
  return (
    <>
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
      {displayItem ? <DisplayEventItem dataItem={dataItem} patientInfo={patientInfo}/> : " "}
      {displayForm ? <DisplayEventForm patientInfo={patientInfo}/> : " "}
    </>
  )
}

