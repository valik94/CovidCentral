import "./calendar.scss";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import Moment from 'moment';
import CloseIcon from "@mui/icons-material/Close";


//different color used for appointments by the user
const colors = [
  {
    value: "blue",
    label: "blue",
  },
  {
    value: "red",
    label: "red",
  },
  {
    value: "pink",
    label: "pink",
  },
  {
    value: "green",
    label: "green",
  },
];

export default function DisplayEventForm(props) {
  const { patientInfo, events, setEvents, setDisplayForm } = props;

  //////STATES
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [summary, setSummary] = useState("");
  const [color, setColor] = useState("");
  const [patient_id, setPatient_id] = useState(0);

  //////CHANGING STATE FUNCTIONS
  const handleChangePatient = (e) => {
    setPatient_id(e.target.value);
  };

  const handleChangeStart = (time) => {
    let converted = Moment.utc(time).local().format('YYYY-MM-DDTHH:mm:SS.sss')
    setStartAt(converted);
  };
  const handleChangeEnd = (time) => {
    let converted = Moment.utc(time).local().format('YYYY-MM-DDTHH:mm:SS.sss')
    setEndAt(converted);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  /////Constructing a new object to send to back-end
  const newAppointment = {
    startAt: startAt,
    endAt: endAt,
    summary: summary,
    color: color,
    notification_sent: true, //we always send a notification 
    patient_id: patient_id,
    practitioner_id: 1,
  };

  /////Sending new appointment to db
  const addNewEvent = () => {
    return axios
      .post("api/appointments", newAppointment)
      .then((response) => {
        setEvents([...events, response.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="display-form">
      <Paper elevation={24} sx={{padding: 2.5, backgroundColor:"#e1e6f662"}}>
        <CloseIcon onClick={() => setDisplayForm(false)} sx={{m:1.5}}/>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Title</InputLabel>
          <Input
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            aria-describedby="my-helper-text"
            autoFocus={true}
            sx={{ margin: 2 }}
          />
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
            sx={{ margin: 2 }}
          >
            {patientInfo.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.first_name} {option.last_name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth={true} required={true}  sx={{ p: 1 }}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDateTimePicker
              label="Start"
              value={startAt}
              sx={{ mb: 2, p: 1 }}
              onChange={handleChangeStart}
              format="yyyy-MM-dd HH:mm"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
          
        <FormControl fullWidth={true} required={true} sx={{ p: 1 }}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDateTimePicker
              label="End"
              value={endAt}
              sx={{ margin: 2 }}
              onChange={handleChangeEnd}
              format="yyyy-MM-dd HH:mm"
              renderInput={(params) => <TextField {...params} sx={{padding : 0}}/>}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth={true} required={true}>
          <TextField
            id="select_color"
            select
            value={color}
            sx={{ margin: 2 }}
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

      <div className="add-event-button">
        <Button sx={{bgcolor: '#0f003d', color:'white', borderRadius: 7, '&:hover':{bgcolor: '#c5e060', color:"black"}}} variant="contained" onClick={(e) => addNewEvent()}>Add Event</Button>
      </div>
      </Paper>
    </div>
  );
}
