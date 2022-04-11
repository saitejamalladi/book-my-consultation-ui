import React from "react";

import "./Header.css";
import logoSrc from "../../assets/logo.jpeg";
import { Button, Grid, Typography } from "@material-ui/core";
import { logoutService } from "../../util/fetch";

function Header({ authenticated, handleOpenLogin, handleLogout }) {
  const handleSubmitLogout = async () => {
    await logoutService();
    localStorage.removeItem("token");
    localStorage.removeItem("emailId");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    handleLogout();
  };
  return (
    <Grid
      container
      className={"HeaderContainer"}
      spacing={2}
      justify={"space-between"}
    >
      <Grid item>
        <Grid container className={"BrandContainer"} spacing={4}>
          <Grid item>
            <Typography>
              <img className={"BrandImage"} src={logoSrc} alt={"Logo"} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              component="div"
              classes={{ h6: "BrandName" }}
            >
              Doctor Finder
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {authenticated ? (
          <Button
            color={"secondary"}
            variant={"contained"}
            onClick={handleSubmitLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={handleOpenLogin}
          >
            Login
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default Header;
