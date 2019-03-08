import isEmpty from "./isEmpty";
import Validator from "validator";

const Login = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "E-mail не корректен";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail пустой";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Пароль пустой";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default Login;
