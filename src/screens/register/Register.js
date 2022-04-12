import React, { useState } from "react";
import { registerService } from "../../util/fetch";
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

function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [response, setResponse] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [mobileError, setMobileError] = useState(false);
  const [dob, setDob] = useState(new Date());

  const handleMobileChange = (e) => {
    let updatedMobile = e.target.value;
    setMobile(updatedMobile);
    if (isNaN(updatedMobile)) {
      setMobileError("Invalid mobile number");
    } else {
      setMobileError(false);
    }
  };
  const submitRegister = async (e) => {
    e.preventDefault();

    if (isNaN(mobile) || mobile?.length !== 10) {
      setMobileError("Enter valid mobile number");
      return;
    }

    setSubmitting(true);
    setResponse(null);
    setSubmitError(null);
    let registerOj = {
      firstName: firstName,
      lastName: lastName,
      dob: format(dob, "yyy-MM-dd"),
      mobile: mobile,
      password: password,
      emailId: email,
    };
    try {
      await registerService(registerOj);
      setResponse("Registration Successful");
      setSubmitting(false);
      setRegistrationComplete(true);
    } catch (error) {
      setSubmitting(false);
      setSubmitError(error);
    }
  };

  return (
    <React.Fragment>
      {submitting && (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      )}
      {response && (
        <Alert mt={2} mb={1} severity="success">
          {response}
        </Alert>
      )}
      {submitError && (
        <Alert mt={2} mb={1} severity="error">
          {submitError}
        </Alert>
      )}

      <form onSubmit={submitRegister}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <TextField
              required
              id="first-name"
              label="First Name"
              disabled={submitting || registrationComplete}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="last-name"
              label="Last Name"
              disabled={submitting || registrationComplete}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="email"
              label="Email"
              disabled={submitting || registrationComplete}
              value={email}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="password"
              label="Password"
              disabled={submitting || registrationComplete}
              value={password}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="mobile"
              label="Mobile"
              disabled={submitting || registrationComplete}
              error={mobileError}
              helperText={mobileError}
              value={mobile}
              onChange={handleMobileChange}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                required
                autoOk
                label="Date"
                value={dob}
                disabled={submitting || registrationComplete}
                onChange={(value) => setDob(value)}
                format="yyyy-MM-dd"
                animateYearScrolling
                disableToolbar
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <Button
              type={"submit"}
              color={"primary"}
              variant={"contained"}
              disabled={submitting || registrationComplete}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default Register;
