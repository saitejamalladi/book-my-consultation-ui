import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
import { loginService } from "../../util/fetch";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await loginService(email, password);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("emailId", response.emailAddress);
      localStorage.setItem("userId", response.id);
      localStorage.setItem(
        "userName",
        `${response.firstName} ${response.lastName}`
      );
      handleLogin();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction={"column"}
          className={"BrandContainer"}
          spacing={4}
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="email" required>
                Email
              </InputLabel>
              <Input
                id="email"
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                id="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button color={"primary"} variant={"contained"} type={"submit"}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Login;
