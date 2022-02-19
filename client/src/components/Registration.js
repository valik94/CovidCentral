import React, { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Registration = () => {
  let navigate = useNavigate();
  const [firstNameReq, setFirstNameReq] = useState("");
  const [lastNameReq, setLastNameReq] = useState("");
  const [emailReq, setEmailReq] = useState("");
  const [passwordReq, setPasswordReq] = useState("");
  const [specialtyReq, setSpecialtyReq] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setFirstNameReq("");
    setLastNameReq("");
    setEmailReq("");
    setPasswordReq("");
    setSpecialtyReq("");
  }

  const register = () => {
    if (firstNameReq === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "First Name is missing!",
      });
      return;
    }
    if (lastNameReq === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Last Name is missing!",
      });
      return;
    }
    if (emailReq === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email is missing!",
      });
      return;
    }
    if (passwordReq === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is missing!",
      });
      return;
    }
    if (specialtyReq === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Specialty is missing!",
      });
      return;
    }

    axios
      .post("api/register", {
        first_name: firstNameReq,
        last_name: lastNameReq,
        email: emailReq,
        password: passwordReq,
        specialty: specialtyReq,
      })
      .then((response) => {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        console.log(response);
      });
  };

  return (
    <section className="Form my-4 mx-5">
      <div className="container">
        <div className="col-lg-7 px-5 pt-5">
          <h1 className="font-weight-bold py-3">Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="First Name"
                name="first_name"
                value={firstNameReq}
                required
                onChange={(e) => {
                  setFirstNameReq(e.target.value);
                }}
                // onChange={handleChange}
              />
              {/* {errors.first_name && (
                <p className="error">*{errors.first_name}</p>
              )} */}
            </div>
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="Last Name"
                name="last_name"
                value={lastNameReq}
                required
                // onChange={handleChange}
                onChange={(e) => {
                  setLastNameReq(e.target.value);
                }}
              />
              {/* {errors.last_name && <p className="error">*{errors.last_name}</p>} */}
            </div>

            <div className="form-row col-lg-7">
              <input
                type="email"
                className="form-control my-3 p-2"
                placeholder="Email"
                name="email"
                value={emailReq}
                required
                // onChange={handleChange}
                onChange={(e) => {
                  setEmailReq(e.target.value);
                }}
              />
              {/* {errors.email && <p className="error">*{errors.email}</p>} */}
            </div>

            <div className="form-row col-lg-7">
              <input
                type="password"
                className="form-control my-3 p-2"
                placeholder="Password"
                name="password"
                value={passwordReq}
                required
                // onChange={handleChange}
                onChange={(e) => {
                  setPasswordReq(e.target.value);
                }}
              />
              {/* {errors.password && <p className="error">*{errors.password}</p>} */}
            </div>
            <div className="form-row col-lg-7">
              <input
                type="text"
                className="form-control my-3 p-2"
                placeholder="Specialty"
                name="specialty"
                value={specialtyReq}
                required
                // onChange={handleChange}
                onChange={(e) => {
                  setSpecialtyReq(e.target.value);
                }}
              />
              {/* {errors.password && <p className="error">*{errors.password}</p>} */}
            </div>

            <div className="form-row col-lg-3">
              <button
                type="submit"
                className="btn btn-md btn-primary"
                onClick={register}
              >
                Register
              </button>
            </div>

            <Link href="/login" variant="body2">
              {"Do you have an account? Log In"}
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
