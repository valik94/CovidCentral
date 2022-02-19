import "./calendar.scss";
import Box from "@mui/material/Box";
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
  const { dataItem, patientInfo } = props;

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

  console.log("DAtaITEM", new Date(dataItem.startAt));

  const verifyNotificationStatus = function (date) {
    let notificationStatus = "";
    if (date) {
      notificationStatus = "Patient notified";
    } else notificationStatus = "Patient was NOT notified";
    return notificationStatus;
  };

  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 2,
          width: 250,
          height: 800,
          backgroundColor: "primary.dark",
          color: "white",
        },
      }}
    >
      <Paper elevation={24}>
        <CloseIcon />
        <Typography
          sx={{ mt: 4, mb: 2, color: "white", textAlign: "center" }}
          variant="h6"
          component="div"
        >
          <CalendarTodayIcon />
          {dataItem.summary}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              {getPatientById(patientInfo, dataItem.patient_id)}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText>{changeDateFormat(dataItem.startAt)}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText>
              {changeHourFormat(dataItem.startAt)} -{" "}
              {changeHourFormat(dataItem.endAt)}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EditNotificationsIcon />
            </ListItemIcon>
            <ListItemText>
              {verifyNotificationStatus(dataItem.notification_sent)}
            </ListItemText>
          </ListItem>
        </List>
      </Paper>{" "}
    </Box>
  );
}
