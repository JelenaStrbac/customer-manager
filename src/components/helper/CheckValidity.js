export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid =
      (typeof value !== "number" ? value.trim() !== "" : value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.length) {
    isValid = value.length === rules.length && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPhone) {
    const pattern = /^(((\+381)(\s|-|\/)?(([0-9]){2}){1})|((0){1}([1-9]){2}))(\s|-|\/)?(([0-9])\d{6}|([0-9])\d{5}){1}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPositive) {
    isValid =
      (typeof value !== "number" ? parseInt(value.replace(/,/g, "")) : value) >=
        0 && isValid;
  }

  return isValid;
};
