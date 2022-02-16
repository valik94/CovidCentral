import React  from "react";

function PatientInfo (props) {
  const { patients, setPatients, patientsHistory, setPatientsHistory} = props

  return (
    <section className="infoBar">
      <div className="patientInfo">
        <h3>Patient Contact Info:</h3>
        <label>Full Name:</label>
        <p>ALEX TEST</p>
        <label>Date Of Birthday:</label>
        <p>2003-01-17</p>
        <label>Gender:</label>
        <p>Male</p>
        <label>Email Address:</label>
        <p>phasellus.at@hotmail.ca</p>
        <label>Health Card</label>
        <p>DB354</p>
        <label>Phone Number:</label>
        <p>(714) 365-6546</p>
        <label>Emergency Contact Number:</label>
        <p>547-438-0720</p>
        <h3>Medical History:</h3>
        <p>DM2, HTN, CHF</p>
        <label>Diagnosis</label>
        <p>Asthma</p>
        <label>Medication</label>
        <p>Atrovastatin, Lasix, Metropolol</p>
        <label>Surgery</label>
        <p>N.A.</p>
      </div>
    </section>
  );
}

export default PatientInfo;
