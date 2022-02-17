import React from "react";
import NotesItem from './NotesItem.js'


export default function PatientNotes(props) {
  const { patientNotes, setPatientNotes } = props;

  const displayNotes = patientNotes.map((note)=> {
    return (
    <NotesItem 
      key={note.id}
      title={note.title}
      message={note.message}
      created_at={note.created_at}
    />)
  })

  return (
    <div className="container-patient">
      <div className="patient-notes">
        <h3>Patient Notes</h3>
        <div className="shadow-lg p-3">
          {displayNotes}
          <form>
            <div className="flex items-center justify-center h-screen bg-gray-200">
              <div className="bg-white rounded-lg border shadow-lg p-4 w-1/5">
                <textarea
                  placeholder="Title..."
                  rows="1"
                  className="text_field bg-gray-200 p-1 h-20 w-full mt-0 good"
                  cols="100"
                ></textarea>
                <textarea
                  placeholder="Entry..."
                  rows="4"
                  className="text_field bg-gray-200 p-1 h-20 w-full mt-0 good"
                  cols="100"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <button type="submit" className="btn btn-md btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
