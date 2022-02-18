import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import './patient.scss';
import classNames from "classnames";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function PatientInfo(props) {
  const { patients, setPatients, patientsHistory, setPatientsHistory } = props;

  const params = useParams();

  const [firstName, setFirstName] = useState(patients.first_name)
  const [lastName, setLastName] = useState(patients.last_name)
  const [dateOfBirth, setDateOfBirth] = useState(patients.date_of_birth)
  const [gender, setGender] = useState(patients.gender)
  const [email, setEmail] = useState(patients.email)
  const [healthcareCard, setHealthCareCard] = useState(patients.healthcare_card)
  const [phone, setPhone] = useState(patients.phone)
  const [emergencyContact, setEmergencyContact] = useState(patients.emergency_contact)
  const [medicalHistory, setMedicalHistory] = useState(patientsHistory.medical_history_details)
  const [diagnosis, setDiagnosis] = useState(patientsHistory.diagnosis_details)
  const [medication, setMedication] = useState(patientsHistory.medication_details)
  const [surgery, setSurgery] = useState(patientsHistory.surgery_details)

  //control the edit button
  const [edit, setEdit] = useState(true)

  //constructing object to send to DB
  const updatedPatientInfo = {
    first_name: firstName, 
    last_name: lastName,
    date_of_birth: dateOfBirth,
    gender: gender,
    email: email,
    healthcare_card: healthcareCard,
    phone: phone,
    emergency_contact: emergencyContact,
    medical_history_details: medicalHistory,
    diagnosis_details: diagnosis,
    medication_details: medication, 
    surgery_details: surgery
  }

  const updatePatient = function () {
    // return axios 
    //   .put(`/api/patients/${params.id}`, updatedPatientInfo)
    //   .then((response) => {
    //     setPatients(response.data.patients) //have to make sure which object is returned by the db
    //     setPatientsHistory(response.data.patients)
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })
    setEdit(true)
    console.log(updatedPatientInfo)
  }

  return (
    <section className="infoBar">
      <div className="patientInfo">
        <div className="edit-save-button">
          <Button variant="contained" startIcon={<EditIcon />} onClick={(e)=> setEdit(!edit)}>Edit</Button>
          <Button variant="contained" disabled={edit} onClick={(e) => {updatePatient()}}>Save Changes</Button>
        </div>
        <hr/>
        <h3>Patient Information and Medical History</h3>
        <hr/>
        <Box
          // component="form"
          // sx={{
          //   "& > :not(style)": { m: 3 },
          //   alignItems: 'right',
          //   backgroundColor: 'white'
          // }}
          // autoComplete="off"
        
       >
        <FormControl fullWidth={true} required={true}>
          <TextField
            id="firstName"
            label="First Name"
            defaultValue={patients.first_name}
            onChange={(e) => {setFirstName(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            defaultValue={patients.last_name}
            onChange={(e) => {setLastName(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="dateOfBirth"
            label="Date of Birth"
            defaultValue={patients.date_of_birth}
            onChange={(e) => {setDateOfBirth(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="gender"
            label="Gender"
            defaultValue={patients.gender}
            onChange={(e) => {setGender(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="healthCareCard"
            label="Healthcare Card"
            defaultValue={patients.healthcare_card}
            onChange={(e) => {setHealthCareCard(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            defaultValue={patients.email}
            onChange={(e) => {setEmail(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="phone"
            label="Phone Number"
            defaultValue={patients.phone}
            onChange={(e) => {setPhone(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="emergencyContact"
            label="Emergency Contact"
            defaultValue={patients.emergency_contact}
            onChange={(e) => {setEmergencyContact(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="diagnosis"
            label="Diagnosis"
            defaultValue={patientsHistory.diagnosis_details}
            onChange={(e) => {setDiagnosis(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
            
          />
          <TextField
            id="medicalHistory"
            label="Medical History"
            defaultValue={patientsHistory.medical_history_details}
            onChange={(e) => {setMedicalHistory(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="surgeries"
            label="Surgeries"
            defaultValue={patientsHistory.surgery_details}
            onChange={(e) => {setSurgery(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
          <TextField
            id="medication"
            label="Medication List"
            defaultValue={patientsHistory.medication_details}
            onChange={(e) => {setMedication(e.target.value)}}
            disabled={edit}
            required
            margin="normal"
          />
        </FormControl>
       </Box>
      </div>
    </section>
  );
}
  
  export default PatientInfo;