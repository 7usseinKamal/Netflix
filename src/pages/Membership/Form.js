import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useForm from "../../components/hooks/use-form";
import { IoIosArrowForward } from "react-icons/io";

import classes from "./Form.module.css";
import { signUp } from "../../components/Auth/Auth";
import InputContainer from "../../components/UI/InputContainer";

let blocker = false;

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InputForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // state to disabled button
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);

  // show password button
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // email value and validation
  const {
    value: emailValue,
    hasError: emailHasError,
    onBlur: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useForm((value) => value.match(emailRegExp));

  // password value and validation
  const {
    value: passwordValue,
    hasError: passwordHasError,
    onBlur: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
  } = useForm((value) => value.trim().length >= 6);

  // get email
  const getEmailHandler = () => {
    setIsPasswordShow(true);
  };

  useEffect(() => {
    if (emailValue.match(emailRegExp)) {
      setEmailIsNotValid(true);
    } else {
      setEmailIsNotValid(false);
    }
  }, [emailValue]);

  const buttonClass = !emailIsNotValid ? classes.disabled : "";

  // submit form
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (!blocker) {
      if (isLoggedIn) {
        navigate("/home");
        blocker = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <form className={`${classes.form} d-flex`} onSubmit={submitHandler}>
      {!isPasswordShow && (
        <Fragment>
          <InputContainer
            type="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
            labelP="Email address"
            message="Email is required!"
          />
          <button
            type="button"
            className={`${buttonClass} py-1 px-3 d-flex align-items-center text-capitalize`}
            onClick={getEmailHandler}
            disabled={!emailIsNotValid}
          >
            get ready <IoIosArrowForward />
          </button>
        </Fragment>
      )}
      {isPasswordShow && (
        <Fragment>
          <InputContainer
            type="password"
            value={passwordValue}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            hasError={passwordHasError}
            labelP="Password"
            message="Password is required!"
          />
          <button
            type="submit"
            className="py-1 px-3 d-flex align-items-center text-capitalize"
          >
            get Start <IoIosArrowForward />
          </button>
        </Fragment>
      )}
    </form>
  );
};

export default InputForm;
