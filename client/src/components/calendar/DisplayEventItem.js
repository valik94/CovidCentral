import './calendar.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function DisplayEventItem (props) {
  const { dataItem } = props;

  console.log("THIS IS ITEM DATA", dataItem)
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
      ITEM
    </Paper>  </Box>
  )
}