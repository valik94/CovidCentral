import './calendar.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import { useState } from 'react'

const colors = [
  {
    value: 'blue',
    label: 'blue'
  }, 
  {
   value: 'red',
    label: 'red'
  },
  {
    value: 'pink',
    label: 'pink'
  }
]

export default function DisplayEventForm ({patientInfo}) {
  //const [patient, setPatient] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [summary, setSummary] = useState("")
  const [color, setColor] = useState("")
  //const [notification_sent, setNotification_sent] = useState(false)
  const [patient_id, setPatient_id] = useState(0)


  const handleChangePatient = (e) => {
    setPatient_id(e.target.value)
  }

  const handleChangeStart = (time) => {
    let converted = new Date(time);
    setStartAt(converted.toISOString());
  };
  const handleChangeEnd = (time) => {
    setEndAt(time);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value)
  }

  const newAppointment = {
    startAt: startAt, 
    endAt: `${startAt} NEED to calculate`, 
    summary: summary, 
    color: color, 
    notification_sent: false, //to be changed once we add the functional 
    patient_id: patient_id,
    practitioner_id: 1
  }

  // const addNewEvent = () => {
  //   return axios 
  //     .post(api/)
  // }

  return (
    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: 350,
        height: 800,
        backgroundColor: 'primary'
      },
    }}
    >
    <Paper elevation={24}>

    <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input id="first_name" value={summary} onChange={(e)=> setSummary(e.target.value)} aria-describedby="my-helper-text" autoFocus={true}/>
      </FormControl>

      <FormControl fullWidth={true} required={true}>
        <TextField
          id="select_patient"
          select
          value={patient_id}
          label="Select patient"
          onChange={handleChangePatient}
          // helperText="Select gender"
          variant="standard"
        >
          {patientInfo.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.first_name} {option.last_name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl> 

      <FormControl fullWidth={true} required={true}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Start"
            value={startAt}
            onChange={handleChangeStart}
            format="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl> 

      <FormControl fullWidth={true} required={true}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="End"
            value={endAt}
            onChange={handleChangeEnd}
            format="yyyy-MM-dd HH:mm:ss"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl> 

      <FormControl fullWidth={true} required={true}>
        <TextField
          id="select_color"
          select
          value={color}
          label="Select color"
          onChange={handleChangeColor}
          // helperText="Select gender"
          variant="standard"
        >
          {colors.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
              
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      
      {/* <Button variant="contained" onClick = {(e) => addNewEvent()} > Add Patient </Button> */}
    </Paper>
  </Box>
  )
} 