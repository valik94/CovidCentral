import Kalend, { CalendarView } from 'kalend' // import component
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'kalend/dist/styles/index.css'; // import styles
import DisplayEvent from './DisplayEvent.js'

export default function Calendar (props) {
  const [events, setEvents] = useState([])

  //Axios request to fetch the events in the calendar
  useEffect(() => {
    axios.get("/api/practitioners")
    .then(response => {
      setEvents(response.data.appointments) 
    })
    .catch ((err) => {
      console.log(err.message);
    })
  }, []);

  //Allows to display more information about the event
  const onEventClick = (data) => {
    const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
      data
    )}`;
    console.log(msg);
  };

  // const onNewEventClick = (data) => {
  //   const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
  //     hour: data.hour,
  //     day: data.day,
  //     event: 'click event ',
  //   })}`;
  //   console.log(msg);
  // };

  

  return (
    <>
      <Kalend
        onEventClick={onEventClick}
        //onNewEventClick={onNewEventClick}
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
      <DisplayEvent />
    </>
  )
}

