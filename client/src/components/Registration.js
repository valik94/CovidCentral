import React, { useState } from "react";

const Registration = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section className="Form my-4 mx-5">
      <div className="container">
        <div className="col-lg-7 px-5 pt-5">
          <h1 className="font-weight-bold py-3">Sign Up</h1>

          <form action="/register" method="post">
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-row col-lg-7">
              <input
                type="email"
                className="form-control my-3 p-2"
                placeholder="Email"
                name="email"
                value={values.email}
              />
            </div>

            <div className="form-row col-lg-7">
              <input
                type="password"
                className="form-control my-3 p-2"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-row col-lg-3">
              <button
                type="submit"
                className="btn btn-md btn-primary"
                onClick={handleFormSubmit}
              >
                Register
              </button>
            </div>
            <p>
              Do you have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
