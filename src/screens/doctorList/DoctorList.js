import React, { useEffect, useState } from "react";
import { doctorFetchService, specialitiesFetchService } from "../../util/fetch";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import DoctorDetails from "./DoctorDetails";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("ENT");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [bookAppointmentDoctor, setBookAppointmentDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async (selectedSpeciality) => {
      try {
        let doctorsList = await doctorFetchService(selectedSpeciality);
        setDoctors(doctorsList);
      } catch (error) {
        alert("Error fetching the doctors" + error);
      }
    };
    setDoctors([]);
    fetchDoctors(selectedSpeciality);
  }, [selectedSpeciality]);
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        let specialitiesList = await specialitiesFetchService();
        setSpecialities(specialitiesList);
      } catch (error) {
        alert("Error fetching the specialities" + error);
      }
    };
    fetchSpecialities();
  }, []);
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
      <Grid item style={{ width: "50%" }}>
        <TextField
          id="speciality"
          select
          label="Select Speciality"
          value={selectedSpeciality}
          onChange={(e) => setSelectedSpeciality(e.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="standard"
        >
          <option value={null}>All</option>
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality}>
              {speciality}
            </option>
          ))}
        </TextField>
      </Grid>
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <Grid item key={index} style={{ width: "50%" }}>
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
                  Doctor Name: {doctor.firstName} + {doctor.lastName}
                </Typography>
                <Typography component="div" style={{ padding: 0 }}>
                  Speciality: {doctor.speciality}
                </Typography>
                <Typography component="div" style={{ padding: 0 }}>
                  Rating:
                  <Rating name="read-only" value={doctor.rating} readOnly />
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Button
                      color={"primary"}
                      variant={"contained"}
                      fullWidth
                      onClick={() => setBookAppointmentDoctor(doctor)}
                    >
                      Book Appointment
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color={"secondary"}
                      variant={"contained"}
                      fullWidth
                      style={{
                        backgroundColor: "green",
                      }}
                      onClick={() => setSelectedDoctorId(doctor.id)}
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ))
      ) : (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      )}
      <DoctorDetails
        doctorId={selectedDoctorId}
        onClose={() => setSelectedDoctorId(null)}
      />
      {bookAppointmentDoctor && (
        <BookAppointment
          doctor={bookAppointmentDoctor}
          onClose={() => setBookAppointmentDoctor(null)}
        />
      )}
    </Grid>
  );
}

export default DoctorList;
