import React, { useEffect, useState } from "react";
import CustomModal from "../../common/customModal/CustomModal";
import { bookAppointmentService, timeSlotFetchService } from "../../util/fetch";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { Alert } from "@material-ui/lab";

function BookAppointment({ doctor, onClose }) {
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [timeslotError, setTimeslotError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (!selectedTimeslot) {
      setTimeslotError("Select a time slot");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    let appointmentOj = {
      doctorId: doctor.id,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      userEmailId: localStorage.getItem("emailId"),
      timeSlot: selectedTimeslot,
      appointmentDate: format(selectedDate, "yyyy-MM-dd"),
      createdDate: new Date(),
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory,
    };
    try {
      let response = await bookAppointmentService(appointmentOj);
      setSubmitting(false);
      if (response && response.status === 400) {
        setSubmitError("Either the slot is already booked or not available");
      } else {
        onClose();
      }
    } catch (error) {
      setSubmitting(false);
      setSubmitError(error);
    }
  };

  useEffect(() => {
    const fetchTimeslots = async (doctorId, selectedDate) => {
      try {
        let response = await timeSlotFetchService(
          doctorId,
          format(selectedDate, "yyyy-MM-dd")
        );
        setAvailableTimeslots(response?.timeSlot);
      } catch (error) {
        alert("Error fetching the specialities" + error);
      }
    };
    fetchTimeslots(doctor.id, selectedDate);
  }, [doctor, selectedDate]);

  return (
    <CustomModal
      width={"50%"}
      open={Boolean(doctor)}
      onClose={onClose}
      header="Book an Appointment"
    >
      {submitting && (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      )}
      {submitError && (
        <Alert mt={2} mb={1} severity="error">
          {submitError}
        </Alert>
      )}
      <form onSubmit={bookAppointment}>
        <Grid container spacing={2} direction={"column"}>
          <Grid item>
            <TextField
              id="doctor-name"
              label="Doctor Name"
              disabled={submitting}
              value={`${doctor.firstName} ${doctor.lastName}`}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Appointment Date"
                value={selectedDate}
                disabled={submitting}
                onChange={(value) => {
                  setTimeslotError(null);
                  setSelectedDate(value);
                }}
                animateYearScrolling
                disableToolbar
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <TextField
              id="timeslot"
              select
              label="Timeslot"
              disabled={submitting}
              error={timeslotError}
              helperText={timeslotError}
              value={selectedTimeslot}
              onChange={(e) => setSelectedTimeslot(e.target.value)}
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              <option value={null}>None</option>
              {availableTimeslots.map((timeslot, index) => (
                <option key={index} value={timeslot}>
                  {timeslot}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id="medical-history"
              label="Medical History"
              multiline
              rows={4}
              disabled={submitting}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="symptoms"
              label="Symptoms"
              multiline
              rows={4}
              disabled={submitting}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button
              type={"submit"}
              color={"primary"}
              variant={"contained"}
              disabled={submitting}
            >
              Book Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomModal>
  );
}

export default BookAppointment;
