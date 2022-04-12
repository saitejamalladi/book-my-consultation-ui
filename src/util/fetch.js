const BASE_URL = "http://localhost:8080";

//Service call for register API
export const registerService = (registerObj) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerObj),
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/users/register", requestOptions)
      .then((res) => res)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for login API
export const loginService = (email, password) => {
  const encodedString = Buffer.from(`${email}:${password}`).toString("base64");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedString}`,
    },
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/auth/login", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for doctor specialities API
export const specialitiesFetchService = () => {
  return new Promise((resolve, reject) => {
    let url = BASE_URL + "/doctors/speciality";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for doctor list API
export const doctorFetchService = (selectedSpeciality) => {
  return new Promise((resolve, reject) => {
    let url = BASE_URL + "/doctors";
    if (selectedSpeciality) {
      url += `?speciality=${selectedSpeciality}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for doctor details API
export const doctorDetailsFetchService = (doctorId) => {
  return new Promise((resolve, reject) => {
    let url = BASE_URL + `/doctors/${doctorId}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for appointment list API
export const appointmentsFetchService = () => {
  return new Promise((resolve, reject) => {
    let emailId = localStorage.getItem("emailId");
    let token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let url = BASE_URL + `/users/${emailId}/appointments`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for doctor timeslots API
export const timeSlotFetchService = (doctorId, appointmentDate) => {
  return new Promise((resolve, reject) => {
    let url =
      BASE_URL + `/doctors/${doctorId}/timeSlots/?date=${appointmentDate}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for book appointment API
export const bookAppointmentService = (appointmentObj) => {
  let token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentObj),
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/appointments", requestOptions)
      .then((res) => res)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for submit Rating API
export const submitRatingService = (ratingObj) => {
  let token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ratingObj),
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/ratings", requestOptions)
      .then((res) => res)
      .then(() => {
        resolve();
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

//Service call for logout API
export const logoutService = () => {
  let token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/auth/logout", requestOptions)
      .then((res) => res)
      .then(() => {
        resolve();
      })
      .catch((error) => console.log("error", reject(error)));
  });
};
