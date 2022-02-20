import "./calendar.scss";
import Box from "@mui/material/Box";
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
  const { patientInfo, events, setEvents } = props;

  //const [patient, setPatient] = useState("")
  const [startAt, setStartAt] = useState(new Date("2022-02-01T09:00:00"));
  
  const [endAt, setEndAt] = useState(new Date("2022-02-01T09:00:00"));
  const [summary, setSummary] = useState("");
  const [color, setColor] = useState("");
  //const [notification_sent, setNotification_sent] = useState(false)
  const [patient_id, setPatient_id] = useState(0);

  const handleChangePatient = (e) => {
    setPatient_id(e.target.value);
  };

  // console.log("STARTAT", startAt, "endAt", endAt)
  const handleChangeStart = (time) => {
    // let converted = new Date(time);
    let converted = Moment.utc(time).local().format('YYYY-MM-DDTHH:mm:SS.sss')
    setStartAt(converted);


  };
  const handleChangeEnd = (time) => {
    // let converted = new Date(time);
    let converted = Moment.utc(time).local().format('YYYY-MM-DDTHH:mm:SS.sss')
    setEndAt(converted);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  console.log("STARTAT", startAt, "endAt", endAt)

  const newAppointment = {
    startAt: startAt,
    endAt: endAt,
    summary: summary,
    color: color,
    notification_sent: false, //to be changed once we add the functional
    patient_id: patient_id,
    practitioner_id: 1,
  };

  console.log("NEWAPP:", newAppointment)

  //sending new appointment to db
  const addNewEvent = () => {
    return axios
      .post("api/appointments", newAppointment)
      .then((response) => {
        console.log("THIS IS A RESPONSE DATA", response.data);
        setEvents([...events, response.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box
      mr={35}
      sx={{
        display: "flex",
        "& > :not(style)": {
          p: 1,
          width: 500,
          height: 800,
          backgroundColor: "primary",
        },
      }}
    >
      <Paper elevation={24}>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Title</InputLabel>
          <Input
            id="first_name"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            aria-describedby="my-helper-text"
            autoFocus={true}
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
            <DesktopDateTimePicker
              label="Start"
              value={startAt}
              onChange={handleChangeStart}
              format="yyyy-MM-dd HH:mm"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth={true} required={true}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDateTimePicker
              label="End"
              value={endAt}
              onChange={handleChangeEnd}
              format="yyyy-MM-dd HH:mm"
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

        <Button variant="contained" onClick={(e) => addNewEvent()}>
          Add Event
        </Button>
      </Paper>
    </Box>
  );
}
