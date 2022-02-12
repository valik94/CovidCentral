import React from "react";
import useForm from "./useForm";

const Registration = ({ submitForm }) => {
  const { handleChange, handleFormSubmit, values, errors } =
    useForm(submitForm);
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
              {errors.first_name && (
                <p className="error">*{errors.first_name}</p>
              )}
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
              {errors.last_name && <p className="error">*{errors.last_name}</p>}
            </div>
          

            <div className="form-row col-lg-7">
              <input
                type="email"
                className="form-control my-3 p-2"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">*{errors.email}</p>}
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
              {errors.password && <p className="error">*{errors.password}</p>}
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
