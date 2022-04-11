import React, { useState } from "react";
import CustomModal from "../../common/customModal/CustomModal";
import { submitRatingService } from "../../util/fetch";
import { Button, FormControl, TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

function RateAppointment({ rateAppointment, onClose }) {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(null);
  const submitRating = async (e) => {
    e.preventDefault();
    if (rating) {
      let ratingObj = {
        appointmentId: rateAppointment.appointmentId,
        doctorId: rateAppointment.doctorId,
        rating: rating,
        comments: comments,
      };
      await submitRatingService(ratingObj);
    }
  };
  return (
    <CustomModal
      open={Boolean(rateAppointment)}
      onClose={onClose}
      header="Rate an Appointment"
    >
      <form onSubmit={submitRating}>
        <FormControl>
          <TextField
            id="comments"
            label="Comments"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            variant="standard"
          />
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </FormControl>
        <Button type={"submit"} color={"primary"} variant={"contained"}>
          Rate Appointment
        </Button>
      </form>
    </CustomModal>
  );
}

export default RateAppointment;
