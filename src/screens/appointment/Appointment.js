import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { appointmentsFetchService } from "../../util/fetch";
import RateAppointment from "../doctorList/RateAppointment";

function Appointment({ authenticated }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateAppointment, setRateAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        let appointments = await appointmentsFetchService();
        setAppointments(appointments);
        setLoading(false);
      } catch (error) {
        alert("Error fetching the appointments" + error);
        setLoading(false);
      }
    };
    setAppointments([]);
    if (authenticated) {
      fetchAppointments();
    }
  }, [authenticated]);
  const openRatingAppointment = (appointment) => {
    setRateAppointment({
      appointmentId: appointment.appointmentId,
      doctorId: appointment.doctorId,
    });
  };

  if (authenticated) {
    if (loading) {
      return (
        <Grid
          container
          direction={"column"}
          spacing={2}
          style={{ width: "100%" }}
        >
          <Grid item>
            <Box>
              <CircularProgress size={"6rem"} />
            </Box>
          </Grid>
        </Grid>
      );
    }
    if (appointments.length === 0) {
      return (
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          textAlign={"center"}
          alignContent={"center"}
          spacing={2}
          style={{ width: "100%" }}
        >
          <Grid item>You have no appointments</Grid>
        </Grid>
      );
    }
    return (
      <React.Fragment>
        <Grid
          container
          direction={"column"}
          spacing={2}
          style={{ width: "100%" }}
        >
          {appointments.map((appointment, index) => (
            <Grid item key={index}>
              <Paper elevation={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    p: 2,
                    mb: 2,
                    "& > :not(style)": {
                      width: "100%",
                    },
                  }}
                >
                  <Typography
                    component="div"
                    style={{ padding: 0, marginBottom: 2 }}
                  >
                    Dr: {appointment.doctorName}
                  </Typography>
                  <Typography component="div" style={{ padding: 0 }}>
                    Date: {appointment.appointmentDate}
                  </Typography>
                  <Typography component="div" style={{ padding: 0 }}>
                    Symptoms: {appointment.symptoms}
                  </Typography>
                  <Typography component="div" style={{ padding: 0 }}>
                    priorMedicalHistory: {appointment.priorMedicalHistory}
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={3}>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => openRatingAppointment(appointment)}
                      >
                        Rate Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <RateAppointment
          rateAppointment={rateAppointment}
          onClose={() => setRateAppointment(null)}
        />
      </React.Fragment>
    );
  } else {
    return (
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        textAlign={"center"}
        alignContent={"center"}
        spacing={2}
        style={{ width: "100%" }}
      >
        <Grid item>Login to see appointments</Grid>
      </Grid>
    );
  }
}

export default Appointment;
