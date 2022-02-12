import React, { useEffect, useState } from "react";
import axios from "axios";
import Registration from "./Registration";
import SignupFormSuccess from "./SignupFormSuccess";

const Form = () => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  const getDummyData =  async () =>{

    try {
      const { data } = await axios.get('http://localhost:8080/users/monday')
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    // const data = await getDummyData()
    axios.get('http://localhost:8080/users/monday')
    .then( response =>{
      console.log(response)
    })
  }, [])
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
