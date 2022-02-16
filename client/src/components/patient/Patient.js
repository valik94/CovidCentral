import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./patient.scss";
import PatientNotes from "./PatientNotes";
import PatientInfo from "./PatientInfo";


export default function Patient() {
  return (
    <main className="patientLayout">
      <PatientInfo />
      <PatientNotes />
    </main>
  );
}
