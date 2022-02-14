import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

const genders = [
  {
  value: 'Male',
  label: 'M'
  }, 
  {
  value: 'Female',
  label: 'F'
  }
]

export default function NewPatientForm() {
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState(new Date('2022-02-13T21:11:54'))
  
  const handleChange = (event) => {
    setGender(event.target.value)
  }

  const handleChangeBirthDate = (birthDate) => {
    setBirthDate(birthDate);
  };

  return (
    <Box
     component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      >
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">First Name</InputLabel>
        <Input id="first_name" aria-describedby="my-helper-text" autoFocus={true}/>
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Last Name</InputLabel>
        <Input id="last_name" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="email" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input id="phone" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Emergency contact</InputLabel>
        <Input id="emergency_contact" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <InputLabel htmlFor="my-input">Healthcare Card</InputLabel>
        <Input id="healthcare_card" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl fullWidth={true} required={true}>
        <TextField
          id="select_gender"
          select
          value={gender}
          label="Select gender"
          onChange={handleChange}
          // helperText="Select gender"
          variant="standard"
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
              
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl fullWidth={false} required={true}>
        <LocalizationProvider dateAdapter={DateAdapter}>
           <DesktopDatePicker
            label="Date of Birth"
            inputFormat="MM/dd/yyyy"
            value={birthDate}
            onChange={handleChangeBirthDate}
            renderInput={(params) => <TextField {...params} />}
          /> 
        </LocalizationProvider>
      </FormControl> 
    </Box>
  )
}

      