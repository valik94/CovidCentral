import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewPatientForm from "./newPatientForm.js";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPatient, setFilteredPatient] = useState("");

  // const [apiStatus, setApiStatus] = useState('null')

  useEffect(() => {
    setFilteredPatient(
      patients.filter((patient) =>
        patient.last_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, patients]);

  //Axios request to fetch the events in the calendar
  useEffect(() => {
    axios
      .get("/api/practitioners")
      .then((response) => {
        setPatients(response.data.patients);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <section>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={(e) => setSearch(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
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
            {filteredPatient.length === 0 ? (
              <div>No Result Found</div>
            ) : (
              filteredPatient.map((patient) => (
                <TableRow
                  key={patient.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={{ pathname: `/patients/${patient.id}` }}>
                      {" "}
                      {patient.first_name} {patient.last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{patient.date_of_birth}</TableCell>
                  <TableCell align="left">{patient.gender}</TableCell>
                  <TableCell align="left">{patient.phone}</TableCell>
                  <TableCell align="left">{patient.email}</TableCell>
                  <TableCell align="left">
                    {patient.emergency_contact}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={() => setToggleForm(!toggleForm)}>
        {" "}
        New Patient
      </Button>
      {toggleForm ? (
        <NewPatientForm patients={patients} setPatients={setPatients} />
      ) : (
        " "
      )}
    </section>
  );
}
