import './calendar.scss';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DisplayEventItem from './DisplayEventItem.js'
import DisplayEventForm from './DisplayEventForm.js'

export default function DisplayEvent (props) {

  function chooseDisplay() {
    if (props.displayItem) {
     return (<DisplayEventItem />)
    }
    if (props.displayForm) {
      return (<DisplayEventForm />)
    }
  }

  return (
    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: 250,
        height: 800,
        backgroundColor: 'primary.dark'
      },
    }}
    >
    <Paper elevation={24}>
      {chooseDisplay()}
    </Paper>
  </Box>
  )
}
