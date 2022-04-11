import React, { useState } from "react";

import Header from "../../common/header/Header";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Login from "../login/Login";
import DoctorList from "../doctorList/DoctorList";
import CustomModal from "../../common/customModal/CustomModal";
import Appointment from "../appointment/Appointment";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [openLogin, setOpenLogin] = React.useState(false);
  const [loginTab, setLoginTab] = React.useState("login");
  const [appointmentTab, setAppointmentTab] = React.useState("doctors");

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleLogin = () => {
    setAuthenticated(true);
    setOpenLogin(false);
  };
  const handleLogout = () => {
    setAuthenticated(false);
  };
  return (
    <React.Fragment>
      <Header
        authenticated={authenticated}
        handleOpenLogin={handleOpenLogin}
        handleLogout={handleLogout}
      />
      <CustomModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        header="Authentication"
      >
        <TabContext value={loginTab}>
          <Box sx={{ width: "100%" }}>
            <TabList
              onChange={(event, newTab) => {
                setLoginTab(newTab);
              }}
              indicatorColor="secondary"
              variant="fullWidth"
            >
              <Tab label="LOGIN" value="login" />
              <Tab label="REGISTER" value="register" />
            </TabList>
            <TabPanel value="login">
              <Login handleLogin={handleLogin} />
            </TabPanel>
            <TabPanel value="register">
              <div>Register</div>
            </TabPanel>
          </Box>
        </TabContext>
      </CustomModal>
      <TabContext value={appointmentTab}>
        <Box sx={{ width: "100%" }}>
          <TabList
            onChange={(event, newTab) => {
              setAppointmentTab(newTab);
            }}
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label="DOCTORS" value="doctors" />
            <Tab label="APPOINTMENT" value="appointment" />
          </TabList>
          <TabPanel value="doctors">
            <DoctorList />
          </TabPanel>
          <TabPanel value="appointment">
            <Appointment authenticated={authenticated} />
          </TabPanel>
        </Box>
      </TabContext>
    </React.Fragment>
  );
};
export default Home;
