import './calendar.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function DisplayEventItem (props) {
  const { displayItemData } = props;

  console.log("THIS IS ITEM DATA", displayItemData)
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