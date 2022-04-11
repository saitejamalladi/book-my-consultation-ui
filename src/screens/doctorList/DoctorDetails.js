import React, { useEffect, useState } from "react";
import CustomModal from "../../common/customModal/CustomModal";
import { doctorDetailsFetchService } from "../../util/fetch";
import { LinearProgress, Typography } from "@material-ui/core";

function DoctorDetails({ doctorId, onClose }) {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    const fetchDoctorDetails = async (doctorId) => {
      try {
        let doctorDetails = await doctorDetailsFetchService(doctorId);
        setDoctor(doctorDetails);
      } catch (error) {
        alert("Error fetching the doctor details" + error);
      }
    };
    setDoctor(null);
    if (doctorId) fetchDoctorDetails(doctorId);
  }, [doctorId]);
  return (
    <CustomModal
      open={Boolean(doctorId)}
      onClose={onClose}
      header="Doctor Details"
    >
      {doctor ? (
        <div>
          <Typography>
            Dr: {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography>
            Total Experience: {doctor.totalYearsOfExp} years
          </Typography>
          <Typography>Speciality: {doctor.speciality}</Typography>
          <Typography>Date of Birth: {doctor.dob}</Typography>
          <Typography>City: {doctor.address?.city}</Typography>
          <Typography>Email: {doctor.emailId}</Typography>
          <Typography>Mobile: {doctor.mobile}</Typography>
          <Typography>Rating: {doctor.rating}</Typography>
        </div>
      ) : (
        <LinearProgress />
      )}
    </CustomModal>
  );
}

export default DoctorDetails;
