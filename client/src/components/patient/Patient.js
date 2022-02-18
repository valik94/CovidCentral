import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./patient.scss";
import PatientNotes from "./PatientNotes";
import PatientInfo from "./PatientInfo";
import axios from "axios";

export default function Patient() {
  const params = useParams();
  const [patients, setPatients] = useState({});
  const [patientNotes, setPatientNotes] = useState([]);
  const [patientsHistory, setPatientsHistory] = useState({});

  // const params = useParams()
  useEffect(() => {
    axios
      .get(`/api/patients/${params.id}`)
      .then((response) => {
        setPatients(response.data.patients[0]);
        setPatientsHistory(response.data.patientsHistory[0]);
        setPatientNotes(response.data.patientNotes);
        //console.log(response.data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params.id]);

  if (patientNotes.length === 0) {
    return null;
  }

  console.log("!!!!", patientsHistory)
  console.log("AAAA", patients)

  return (
    <main className="patientLayout">
      <PatientInfo
        patients={patients}
        setPatients={setPatients}
        patientsHistory={patientsHistory}
        setPatientsHistory={setPatientsHistory}
      />
      <PatientNotes
        patientNotes={patientNotes}
        setPatientNotes={setPatientNotes}
        patientId={params.id}
      />
    </main>
  );
}
