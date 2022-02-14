import * as React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function PatientsList() {

const [patients, setPatients] = useState([])
//Axios request to fetch the events in the calendar
useEffect(() => {
  // const data = getDummyData()
  axios.get("/api/practitioners")
  // fetch("/practitioners")
  .then(response => {
    setPatients(response.data.patients)
  })
  .catch ((err) => {
    console.log(err.message);
  })
}, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patients List</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {patient.first_name} {patient.last_name}
              </TableCell>
              <TableCell align="right">{patient.first_name}</TableCell>
              <TableCell align="right">{patient.last_name}</TableCell>
              <TableCell align="right">{patient.email}</TableCell>
              <TableCell align="right">{patient.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
