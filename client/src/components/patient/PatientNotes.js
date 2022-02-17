import React, { useState } from "react";
import NotesItem from "./NotesItem.js";
import Button from "@mui/material/Button";
import axios from "axios";

export default function PatientNotes(props) {
  const { patientNotes, setPatientNotes, patientId } = props;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  //const [patientId, setPatientId] = useState("")
  //const [practitionerId, setPractitionerId] = useState("")

  //let practitionerId = patientNotes.practitioner_id

  const newNote = {
    title: title,
    message: message,
    patient_id: patientId,
    practitioner_id: patientNotes[0].practitioner_id,
  };

  const addNewNote = function () {
    return (
      axios
        // .post(`${patientId}/notes`, newNote)
        .post("/api/notes", newNote)
        .then((response) => {
          //console.log("this is DATTTTTTA", response.data);
          //setState('null')
          setPatientNotes([...patientNotes, response.data]);
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
    // console.log("PATIENT", patientNotes)
    // console.log("HERE", newNote)
  };

  const displayNotes = patientNotes.map((note) => {
    return (
      <NotesItem
        key={note.id}
        title={note.title}
        message={note.message}
        created_at={note.created_at}
      />
    );
  });

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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text_field bg-gray-200 p-1 h-20 w-full mt-0 good"
                  cols="100"
                ></textarea>
                <textarea
                  placeholder="Entry..."
                  rows="4"
                  className="text_field bg-gray-200 p-1 h-20 w-full mt-0 good"
                  cols="100"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
            </div>
            <Button variant="contained" onClick={(e) => addNewNote()}>
              Add Note
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
