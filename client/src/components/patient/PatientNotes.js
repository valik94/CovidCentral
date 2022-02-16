import React from 'react'

function PatientNotes() {
  return (
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
  )
}

export default PatientNotes