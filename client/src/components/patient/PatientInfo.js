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
  }, [params.id]);

  //updating patient information or medical history
  const updatePatient = function () {
    setEdit(true);
    console.log("PT STATe", patient);
    console.log("MORE INFOR", patientHistory);

    return axios
      .put(`/api/patients/${params.id}`, [patient, patientHistory])
      .then((response) => {
        setPatient(response.data.updatedPatient); //have to make sure which object is returned by the db
        setPatientHistory(response.data.updatedPatientHistories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const validationPatient = function () {
    if (
      !patient.first_name.trim() ||
      !patient.last_name ||
      !patient.email ||
      !patient.date_of_birth ||
      !patient.gender ||
      !patient.healthcare_card ||
      !patient.phone ||
      !patient.emergency_contact ||
      !patientHistory.diagnosis_details ||
      !patientHistory.medical_history_details ||
      !patientHistory.surgery_details ||
      !patientHistory.medication_details
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
          >
            Edit
          </Button>
          <Button
            variant="contained"
            disabled={edit}
            onClick={(e) => {
              validationPatient();
            }}
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
              // label="First Name"
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
              // label="Last Name"
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
              // label="Date of Birth"
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
              // label="Gender"
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
              // label="Healthcare Card"
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
              // label="Email"
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
              // label="Phone Number"
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
              // label="Emergency Contact"
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
              // label="Diagnosis"
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
              // label="Medical History"
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
              // label="Surgeries"
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
              // label="Medication List"
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
