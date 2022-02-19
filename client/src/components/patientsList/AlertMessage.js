import Alert from '@mui/material/Alert';
import './patientsList.scss'

export default function AlertMessage () {
  return (
    <div className="alert-message">
      <Alert severity="error">Please complete all required fields.</Alert>
    </div>
  )
}