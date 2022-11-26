export default function validation(values) {
  const errors = {};
  const touched = {};

  if (!values.first_name) {
    errors.first_name = "Required";
  } else if (!!/^[A-Z][а-яА-ЯёЁa-zA-Z-]+$/.test(values.first_name)) {
    errors.first_name = "First name can contain letters and _";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.login) {
    errors.login = "Required";
  } else if (values.login.length < 3 || values.login.length > 20) {
    errors.login = "Login must be 3 to 20 characters";
  } else if (!!/^[a-zA-Z0-9_-]/.test(values.login)) {
    errors.login = "Login can contain numbers, letters, -, _";
  } else if (/[\D]/.test(values.login)) {
    errors.login = "Login mustn't only contain numbers";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.login.length < 8 || values.login.length > 40) {
    errors.login = "Password must be 8 to 40 characters";
  } else if(!!/(?=.*[0-9])(?=.*[A-Z])/.test(values.password)) {
    errors.password = "Password must include one uppercase letter and one number";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!!/^[\+]?[0-9]{10,15}$/.test(values.phone)) {
    errors.phone = "Invalid phone";
  }

  if (!values.message) {
    errors.message = "Required";
  }

  return errors;
}
