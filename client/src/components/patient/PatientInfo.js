import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./patient.scss";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AlertMessageHello from "../patientsList/AlertMessageHello";

function PatientInfo() {
  const params = useParams();
  const [alertMessage, setAlertMessage] = useState(false);
  //initializing patient information state
  const [patient, setPatient] = useState({
    firstName: " ",
    lastName: " ",
    dateOfBirth: " ",
    gender: " ",
    email: " ",
    healthcareCard: " ",
    phone: " ",
    emergencyContact: " ",
    practitionerID: 1,
  });
  const [patientHistory, setPatientHistory] = useState({
    medicalHistory: " ",
    diagnosis: " ",
    medication: " ",
    surgery: " ",
  });

  //control the edit button
  const [edit, setEdit] = useState(true);

  //changing the state of the patient
  const handleChangePatient = function (event) {
    const { name, value } = event.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  //changing the state of the patient history component
  const handleChangePatientHistory = function (event) {
    const { name, value } = event.target;
    setPatientHistory((prev) => ({ ...prev, [name]: value }));
  };

  //empty patient medical history
  const emptyPatientHistory = {
    diagnosis_details: "Void",
    medical_history_details: "Void",
    medication_details: "Void",
    surgery_details: "Void",
  };

  //getting the information about the patient
  useEffect(() => {
    axios
      .get(`/api/patients/${params.id}`)
      .then((response) => {
        if (response.data.patientsHistory.length === 0) {
          setPatientHistory(emptyPatientHistory);
          setPatient(response.data.patients[0]);
        } else {
          setPatientHistory(response.data.patientsHistory[0]);
          setPatient(response.data.patients[0]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  //updating patient information or medical history
  const updatePatient = function () {
    setEdit(true);

    return axios
      .put(`/api/patients/${params.id}`, [patient, patientHistory])
      .then((response) => {
        setPatient(response.data.updatedPatient[0]); //have to make sure which object is returned by the db
        setPatientHistory(response.data.updatedPatientHistories[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const validationPatient = function (values) {
    if (
      !patient?.first_name.trim() ||
      !patient?.last_name.trim() ||
      !patient?.email.trim() ||
      !patient?.date_of_birth.trim() ||
      !patient?.gender.trim() ||
      !patient?.healthcare_card.trim() ||
      !patient?.phone.trim() ||
      !patient?.emergency_contact.trim() ||
      !patientHistory?.diagnosis_details.trim() ||
      !patientHistory?.medical_history_details.trim() ||
      !patientHistory?.surgery_details.trim() ||
      !patientHistory?.medication_details.trim()
    ) {
      setAlertMessage(true);
    } else {
      setAlertMessage(false);
      updatePatient();
    }

  };

  return (
    <section className="infoBar">
      <div className="patientInfo">
        <div className="edit-save-button">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={(e) => setEdit(!edit)}
            sx={{ bgcolor: '#0f003d', color: 'white', borderRadius: 7, '&:hover': { bgcolor: 'white', color: "black" } }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            disabled={edit}
            onClick={(e) => {
              validationPatient(e.target.value);
            }}
            sx={{ bgcolor: '#0f003d', color: 'white', borderRadius: 7, '&:hover': { bgcolor: 'white', color: "black" } }}
          >
            Save Changes
          </Button>
        </div>
        <hr />
        <h3>Patient Information and Medical History</h3>
        <hr />
        {alertMessage ? <AlertMessageHello /> : " "}
        <Box>
          <FormControl fullWidth={true} required={true}>
            <TextField
              variant="outlined"
              id="firstName"
              name={"first_name"}
              value={patient.first_name}
              onChange={handleChangePatient}
              disabled={edit}
              required={true}
              helperText={"*First Name"}
              margin="normal"
            />
            <TextField
              id="lastName"
              variant="outlined"
              name={"last_name"}
              value={patient.last_name}
              onChange={handleChangePatient}
              disabled={edit}
              required={true}
              helperText={"*Last Name"}
              margin="normal"
            />
            <TextField
              id="dateOfBirth"
              variant="outlined"
              name={"date_of_birth"}
              value={patient.date_of_birth}
              onChange={handleChangePatient}
              disabled={edit}
              helperText={"*Date of Birth"}
              required
              margin="normal"
            />
            <TextField
              id="gender"
              variant="outlined"
              name={"gender"}
              value={patient.gender}
              onChange={handleChangePatient}
              disabled={edit}
              helperText={"*Gender"}
              required
              margin="normal"
            />
            <TextField
              id="healthCareCard"
              variant="outlined"
              name={"healthcare_card"}
              value={patient.healthcare_card}
              onChange={handleChangePatient}
              disabled={edit}
              helperText={"*Health Care Card"}
              required={true}
              margin="normal"
            />
            <TextField
              id="email"
              name={"email"}
              variant="outlined"
              value={patient.email}
              onChange={handleChangePatient}
              disabled={edit}
              required={true}
              helperText={"*Email"}
              margin="normal"
            />
            <TextField
              id="phone"
              name={"phone"}
              variant="outlined"
              value={patient.phone}
              onChange={handleChangePatient}
              disabled={edit}
              required={true}
              helperText={"*Phone Number"}
              margin="normal"
            />
            <TextField
              id="emergencyContact"
              variant="outlined"
              name={"emergency_contact"}
              value={patient.emergency_contact}
              onChange={handleChangePatient}
              disabled={edit}
              required={true}
              helperText={"*Emergency Contact"}
              margin="normal"
            />
            <TextField
              id="diagnosis"
              variant="outlined"
              name={"diagnosis_details"}
              value={patientHistory.diagnosis_details}
              onChange={handleChangePatientHistory}
              disabled={edit}
              required={true}
              helperText={"*Diagnosis"}
              margin="normal"
            />
            <TextField
              id="medicalHistory"
              name={"medical_history_details"}
              value={patientHistory.medical_history_details}
              onChange={handleChangePatientHistory}
              disabled={edit}
              variant="outlined"
              helperText={"*Medical History"}
              required
              margin="normal"
            />
            <TextField
              id="surgeries"
              name={"surgery_details"}
              variant="outlined"
              value={patientHistory.surgery_details}
              onChange={handleChangePatientHistory}
              disabled={edit}
              helperText={"*Surgeries"}
              required
              margin="normal"
            />
            <TextField
              id="medication"
              variant="outlined"
              name={"medication_details"}
              value={patientHistory.medication_details}
              onChange={handleChangePatientHistory}
              disabled={edit}
              helperText={"*Medication List"}
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
