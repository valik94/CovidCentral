import { useState, useEffect } from "react";
import validation from "./validation";

const useForm = (submitForm) => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    specialty: ""
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values)); //setError validation values
    setDataIsCorrect(true); //setData updated state to true
  };

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true);
    }
  }, [dataIsCorrect, errors, submitForm]);
  return { handleChange, handleFormSubmit, errors, values };
};

export default useForm;
