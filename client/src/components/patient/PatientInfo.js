import React from "react";

function PatientInfo(props) {
  const { patients, setPatients, patientsHistory, setPatientsHistory } = props;

  
  
  
  return (
    <section className="infoBar">
      <div className="patientInfo">
        <h3>Patient Contact Info:</h3>
        <label>Full Name:</label>
        <p>{patients.first_name} {patients.last_name}</p>
        <label>Date Of Birthday:</label>
        <p>{patients.date_of_birth}</p>
        <label>Gender:</label>
        <p>{patients.gender}</p>
        <label>Email Address:</label>
        <p>{patients.email}</p>
        <label>Health Card</label>
        <p>{patients.healthcare_card}</p>
        <label>Phone Number:</label>
        <p>{patients.phone}</p>
        <label>Emergency Contact Number:</label>
        <p>{patients.emergency_contact}</p>
        <h3>Medical History:</h3>
        <p>{patientsHistory.medical_history_details}</p>
        <label>Diagnosis</label>
        <p>{patientsHistory.diagnosis_details}</p>
        <label>Medication</label>
        <p>{patientsHistory.medication_details}</p>
        <label>Surgery</label>
        <p>{patientsHistory.surgery_details}</p>
      </div>
    </section>
  );
}

export default PatientInfo;
