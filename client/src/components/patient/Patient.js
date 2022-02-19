import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./patient.scss";
import PatientNotes from "./PatientNotes";
import PatientInfo from "./PatientInfo";
import axios from "axios";

export default function Patient() {
  const params = useParams();
  const [patients, setPatients] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [patientsHistory, setPatientsHistory] = useState("");


  useEffect(() => {
    axios
      .get(`/api/patients/${params.id}`)
      .then((response) => {
        // setPatients(response.data.patients[0]);
        // setPatientsHistory(response.data.patientsHistory[0]);
        setPatientNotes(response.data.patientNotes);
        //console.log(response.data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  

  const emptyNote = {
    id: 0,
    title: "0 Notes have been entered for this patient",
    message: " ",
    created_at: " "
  }
  
  if (patientNotes.length === 0) {
    setPatientNotes([emptyNote]); 
  }

  const emptyPatientHistory = {
    diagnosis_details: " ",
    medical_history_details: " ",
    medication_details: " ",
    surgery_details: " "
  }


  return (
    <main className="patientLayout">
      <PatientInfo />
      <PatientNotes
        patientNotes={patientNotes}
        setPatientNotes={setPatientNotes}
        patientId={params.id}
      />
    </main>
  );
}
