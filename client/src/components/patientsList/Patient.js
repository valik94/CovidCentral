import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./patient.scss";

export default function Patient() {
  return (
    <main className="patientLayout">
      <section className="infoBar">
        <div className="patientInfo">
          <h3>Patient Contact Info:</h3>
          <label>Full Name:</label>
          <p>Clinton Schroeder</p>
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
      <div className="container-patient">
        <div className="patient-notes">
          <h3>Patient Notes</h3>
          <label>Title:</label>
          <form>
            <div className="flex items-center justify-center h-screen bg-gray-200">
              <div className="bg-white rounded-lg border shadow-lg p-4 w-1/5">
                <textarea
                  placeholder="Notes..."
                  rows="4"
                  className="text_field bg-gray-200 p-1 h-20 w-full mt-0 good"
                  cols="75"
                ></textarea>
              </div>
            </div>
          </form>

          <button type="submit" className="btn btn-md btn-primary">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
