import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./patient.scss";
import PatientNotes from "./PatientNotes";
import PatientInfo from "./PatientInfo";
import axios from "axios";

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const params = useParams();

  console.log("PARAMS", params)
  useEffect(() => {
    axios
      .get("/api/patients/:id")
      .then((response) => {
        console.log(response)
        setPatients(response.data.patients);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);



  return (
    <main className="patientLayout">
      <PatientInfo />
      <PatientNotes />
    </main>
  );
}
