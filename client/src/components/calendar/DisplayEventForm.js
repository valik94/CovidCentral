import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './calendar.scss';

export default function DisplayEventForm (props) {
  const { dataForm } = props;
  return (
    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: 250,
        height: 800,
        backgroundColor: 'primary.dark'
      },
    }}
    >
    <Paper elevation={24}>
      FROM
    </Paper>
  </Box>
  )
}