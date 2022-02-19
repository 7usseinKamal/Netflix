import { useState } from "react";

const useForm = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  return {
    value: enteredValue,
    hasError,
    onBlur: onBlurHandler,
    valueChangeHandler,
  };
};

export default useForm;
