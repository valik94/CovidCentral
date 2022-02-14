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
            <TableCell align="left">Data of Birth</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Emergency Contact</TableCell>
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
              <TableCell align="left">{patient.date_of_birth}</TableCell>
              <TableCell align="left">{patient.gender}</TableCell>
              <TableCell align="left">{patient.phone}</TableCell>
              <TableCell align="left">{patient.email}</TableCell>
              <TableCell align="left">{patient.emergency_contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
