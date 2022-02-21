import "./calendar.scss";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";


export default function DisplayEventItem(props) {
  const { dataItem, patientInfo, setDisplayItem } = props;

  const getPatientById = function (patientsList, patientID) {
    let patientName = "";
    for (let patient of patientsList) {
      if (patient.id === patientID) {
        patientName = `${patient.first_name} ${patient.last_name}`;
      }
    }
    return patientName;
  };

  const changeDateFormat = function (date) {
    let changedDate = date.slice(0, 10);
    return changedDate;
  };

  const changeHourFormat = function (date) {
    let changedHour = date.slice(11, 16);
    return changedHour;
  };

  const verifyNotificationStatus = function (date) {
    let notificationStatus = "";
    if (date) {
      notificationStatus = "Patient notified";
    } else notificationStatus = "Patient was NOT notified";
    return notificationStatus;
  };

  return (
    <div className="display-event">
      <Paper elevation={24}
        sx={{
          bgcolor: '#0f003d',
          color: 'white',
        }}>
        <CloseIcon onClick={() => setDisplayItem(false)} sx={{m:1.5}}/>
        <Typography
          sx={{ mt: 4, mb: 2, color: "white", textAlign: "center" }}
          variant="h6"
          component="div"
        >
          <CalendarTodayIcon /> {"  "}
          {dataItem.summary}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              {getPatientById(patientInfo, dataItem.patient_id)}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>{changeDateFormat(dataItem.startAt)}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              {changeHourFormat(dataItem.startAt)} -{" "}
              {changeHourFormat(dataItem.endAt)}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EditNotificationsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              {verifyNotificationStatus(dataItem.notification_sent)}
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
