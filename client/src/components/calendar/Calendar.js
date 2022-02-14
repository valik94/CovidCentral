import Kalend, { CalendarView } from 'kalend' // import component
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'kalend/dist/styles/index.css'; // import styles
import { CALENDAR_VIEW } from 'kalend-layout';

export default function Calendar (props) {
  // const [events, setEvents] = useState([])

  // //Axios request to fetch the events in the calendar
  // useEffect(() => {
  //   // const data = getDummyData()
  //   axios.get("/api/practitioners")
  //   // fetch("/practitioners")
  //   .then(response => {
  //     const events = response.data.appointments
  //     setEvents((prev) => ({...prev, events})) 
  //     console.log("THIS IS", events)
  //   })
  //   .catch ((err) => {
  //     console.log(err.message);
  //   })
  // }, []);

  const [selectedView, setSelectedView] = useState(CALENDAR_VIEW.MONTH);

  const events = [
    {
        id: 1,
        startAt: '2022-10-13T16:00:00.000Z',
        endAt: '2022-10-13T17:00:00.000Z',
        // timezoneStartAt: 'Europe/Berlin', // optional
        summary: 'alex',
        color: 'blue',
        calendarID: 'work'
    },
    {
        id: 2,
        startAt: '2022-10-13T18:00:00.000Z',
        endAt: '2022-10-13T19:00:00.000Z',
        // timezoneStartAt: 'Europe/Berlin', // optional
        summary: 'helloo nooo',
        color: 'blue',
    }
  ]

  const onEventClick = (data) => {
    const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
      data
    )}`;
    console.log(msg);
  };

  const onNewEventClick = (data) => {
    const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
      hour: data.hour,
      day: data.day,
      event: 'click event ',
    })}`;
    console.log(msg);
  };

  

  return (
    <Kalend
      onEventClick={onEventClick}
      onNewEventClick={onNewEventClick}
      events={events}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      initialView={CalendarView.WEEK}
      disabledViews={[CalendarView.DAY]}
      onSelectView={selectedView}
      selectedView={selectedView}
      // onPageChange={onPageChange}
      timeFormat={'24'}
      weekDayStart={'Monday'}
      calendarIDsHidden={['work']}
      language={'en'}
    />
  )
}