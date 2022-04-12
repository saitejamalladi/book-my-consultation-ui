import React, { useState } from "react";
import CustomModal from "../../common/customModal/CustomModal";
import { submitRatingService } from "../../util/fetch";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

function RateAppointment({ rateAppointment, onClose }) {
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(null);
  const [ratingError, setRatingError] = useState(false);

  const submitRating = async (e) => {
    e.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    setSubmitting(true);
    let ratingObj = {
      appointmentId: rateAppointment.appointmentId,
      doctorId: rateAppointment.doctorId,
      rating: rating,
      comments: comments,
    };
    await submitRatingService(ratingObj);
    setSubmitting(false);
  };
  return (
    <CustomModal
      open={Boolean(rateAppointment)}
      onClose={onClose}
      header="Rate an Appointment"
    >
      <form onSubmit={submitRating}>
        <Grid container spacing={2} direction={"column"}>
          {submitting && (
            <Grid item>
              <Box sx={{ width: "50%" }}>
                <LinearProgress />
              </Box>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="comments"
              label="Comments"
              multiline
              rows={4}
              value={comments}
              disable={submitting}
              onChange={(e) => setComments(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            Rating:{" "}
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                setRatingError(false);
              }}
              error
              disable={submitting}
              helperText={"error"}
            />
          </Grid>
          {ratingError && (
            <Grid item>
              <Typography color={"secondary"}>Select a rating</Typography>
            </Grid>
          )}
          <Grid item>
            <Button
              type={"submit"}
              color={"primary"}
              variant={"contained"}
              disable={submitting}
            >
              Rate Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomModal>
  );
}

export default RateAppointment;
