const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Введите имя";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
