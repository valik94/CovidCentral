const validation = (values) => {
  let errors = {};

  if (!values.first_name) {
    errors.first_name = "First Name is required";
  }
  if (!values.last_name) {
    errors.last_name = "Last Name is required";
  }
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 3) {
    errors.password = "Password must be more thant 3 characters";
  }

  return errors;
};

export default validation;
