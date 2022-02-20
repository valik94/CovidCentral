import { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Button from "@mui/material/Button";
import './patientsList.scss'
import AlertMessageHello from "./AlertMessageHello.js"

const genders = [
  {
    value: "Male",
    label: "M",
  },
  {
    value: "Female",
    label: "F",
  },
];

export default function NewPatientForm({patients, setPatients, setToggleForm}) {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [healthcareCard, setHealthcareCard] = useState (" ");
  const [emergencyContact, setEmergencyContact] = useState(" ");
  const [gender, setGender] = useState(" ");
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date("2022-02-13T21:11:54")
  );

  const [alertMessage, setAlertMessage] = useState(false)

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleChangeBirthDate = (dateOfBirth) => {
    setDateOfBirth(dateOfBirth);
  };

  const newPatient = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    emergency_contact: emergencyContact,
    healthcare_card: healthcareCard,
    gender: gender,
    date_of_birth: dateOfBirth,
    practitioner_id: 1,
  };

  const addNewPatientBackEnd = async () => {
    await axios
      .post("api/patients", newPatient)
      .then((response) => {
        setPatients([response.data, ...patients]);
        setToggleForm(false)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const verifyLength = function () {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !emergencyContact.trim() || !healthcareCard.trim() || !gender.trim() || !dateOfBirth) {
      return (
        setAlertMessage(true)
      )
    } else {
      setAlertMessage(false)
      addNewPatientBackEnd()
    }
  }

  return (
    <div className="patients-form">
      <div className="new-patient-form">
      {alertMessage ? (<AlertMessageHello />) : (" ")}
        <FormControl fullWidth={true} required={true} >
          <InputLabel htmlFor="my-input">First Name</InputLabel>
          <Input
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="my-helper-text"
            autoFocus={true}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Last Name</InputLabel>
          <Input
            id="last_name"
            aria-describedby="my-helper-text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="email"
            aria-describedby="my-helper-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Phone</InputLabel>
          <Input
            id="phone"
            aria-describedby="my-helper-text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Emergency contact</InputLabel>
          <Input
            id="emergency_contact"
            aria-describedby="my-helper-text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <InputLabel htmlFor="my-input">Healthcare Card</InputLabel>
          <Input
            id="healthcare_card"
            aria-describedby="my-helper-text"
            value={healthcareCard}
            onChange={(e) => setHealthcareCard(e.target.value)}
            required
            margin="dense"
            sx={{ margin: 2 }}
          />
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <TextField
            id="select_gender"
            select
            value={gender}
            label="Select gender"
            onChange={handleChange}
            // helperText="Select gender"
            variant="standard"
            required
            margin="dense"
            sx={{ margin: 2 }}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl fullWidth={true} required={true}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="MM/dd/yyyy"
              value={dateOfBirth}
              onChange={handleChangeBirthDate}
              renderInput={(params) => <TextField {...params} />}
              required
              margin="dense"
              sx={{ margin: 2 }}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
      <div className="new-patient-button">
        <Button sx={{bgcolor: '#0f003d', color:'white', borderRadius: 7, '&:hover':{bgcolor: '#c5e060', color:"black"}}} variant="contained" onClick={verifyLength}> Add Patient </Button>
      </div>
    </div>
  );
}

