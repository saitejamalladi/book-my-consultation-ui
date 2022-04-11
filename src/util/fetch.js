export const specialitiesFetchService = () => {
  return new Promise((resolve, reject) => {
    let url = "http://localhost:8080/doctors/speciality";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

export const doctorFetchService = (selectedSpeciality) => {
  return new Promise((resolve, reject) => {
    let url = "http://localhost:8080/doctors";
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
export const doctorDetailsFetchService = (doctorId) => {
  return new Promise((resolve, reject) => {
    let url = `http://localhost:8080/doctors/${doctorId}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

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
    let url = `http://localhost:8080/users/${emailId}/appointments`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

export const timeSlotFetchService = (doctorId, appointmentDate) => {
  return new Promise((resolve, reject) => {
    let url = `http://localhost:8080/doctors/${doctorId}/timeSlots/?date=${appointmentDate}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};
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
    fetch("http://localhost:8080/appointments", requestOptions)
      .then((res) => res)
      .then(() => {
        resolve();
      })
      .catch((error) => console.log("error", reject(error)));
  });
};
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
    fetch("http://localhost:8080/ratings", requestOptions)
      .then((res) => res)
      .then(() => {
        resolve();
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

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
    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log("error", reject(error)));
  });
};

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
    fetch("http://localhost:8080/auth/logout", requestOptions)
      .then((res) => res)
      .then(() => {
        resolve();
      })
      .catch((error) => console.log("error", reject(error)));
  });
};
