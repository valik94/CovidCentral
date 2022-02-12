import React, { useState, useEffect } from "react";
import axios from "axios";
import Registration from "./Registration";
import SignupFormSuccess from "./SignupFormSuccess";

const Form = () => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  const getDummyData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/users/monday");
      console.log("CLOSE==================:", data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const data = getDummyData()
    axios.get("http://localhost:8080/users/monday")
    .then(response => {
      console.log(response)
    })

    // console.log('DATA:', data)
  }, []);

  return (
    <div>
      {!formIsSubmitted ? (
        <Registration submitForm={submitForm} />
      ) : (
        <SignupFormSuccess />
      )}
    </div>
  );
};

export default Form;
