import React, { useEffect, useState } from "react";
import CustomModal from "../../common/customModal/CustomModal";
import { bookAppointmentService, timeSlotFetchService } from "../../util/fetch";
import { Button, FormControl, TextField } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

function BookAppointment({ doctor, onClose }) {
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);

  const bookAppointment = async (e) => {
    e.preventDefault();
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
    await bookAppointmentService(appointmentOj);
  };

  useEffect(() => {
    const fetchTimeslots = async (doctorId, selectedDate) => {
      try {
        let response = await timeSlotFetchService(
          doctorId,
          format(selectedDate, "yyyy-MM-dd")
        );
        debugger;

        setAvailableTimeslots(response?.timeSlot);
      } catch (error) {
        alert("Error fetching the specialities" + error);
      }
    };
    fetchTimeslots(doctor.id, selectedDate);
  }, [doctor, selectedDate]);

  return (
    <CustomModal
      open={Boolean(doctor)}
      onClose={onClose}
      header="Book an Appointment"
    >
      <form onSubmit={bookAppointment}>
        <FormControl>
          <TextField
            id="doctor-name"
            label="Doctor Name"
            value={`${doctor.firstName} ${doctor.lastName}`}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              label="Clearable"
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
              animateYearScrolling
              disableToolbar
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="timeslot"
            select
            label="Timeslot"
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
          <TextField
            id="medical-history"
            label="Medical History"
            multiline
            rows={4}
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            variant="standard"
          />
          <TextField
            id="symptoms"
            label="Symptoms"
            multiline
            rows={4}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            variant="standard"
          />
        </FormControl>
        <Button type={"submit"} color={"primary"} variant={"contained"}>
          Book Appointment
        </Button>
      </form>
    </CustomModal>
  );
}

export default BookAppointment;
