import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import classes from "./InputContainer.module.css";

const InputContainer = (props) => {
  // to match login page
  const location = useLocation().pathname.slice(1) === "login";

  // ref to focus input
  const inputRef = useRef();

  // state to change label position
  const [labelClass, setLabelClass] = useState("");

  // state to change label position
  const [labelClassTwo, setLabelClassTwo] = useState("");

  // state to show password
  const [showPassword, setShowPassword] = useState(true);

  const message = useSelector((state) => state.ui.authMessage);

  // focus function
  const onFoucsHandler = (e) => {
    if (e.target.classList.contains(classes["error-message"])) {
      return;
    }
    setLabelClass(classes.change);
    setLabelClassTwo(classes.changeTwo);
    inputRef.current.focus();
  };

  // blur functions
  const onBlurHandler = () => {
    if (props.value.trim().length === 0) {
      setLabelClass("");
      setLabelClassTwo("");
    }
  };

  const onBlurHandlerTwo = () => {
    if (props.value.trim().length === 0) {
      setLabelClass("");
      setLabelClassTwo("");
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prevClick) => !prevClick);
  };

  const emailInputClass = props.hasError ? classes.borderBottom : "";
  const passwordInputClass = props.hasError ? classes.borderBottom : "";

  // effect to handle error message
  useEffect(() => {
    if (location && message.indexOf("EMAIL") !== -1 && props.type === "email") {
      inputRef.current.classList.add(classes.borderBottom);
    } else if (
      location &&
      message.indexOf("PASSWORD") !== -1 &&
      props.type === "password"
    ) {
      inputRef.current.classList.add(classes.borderBottom);
    } else if (message.indexOf("PASSWORD") !== -1 && props.type === "password") {
      inputRef.current.classList.add(classes.borderBottom);
    }

    let current = inputRef.current;

    return () => current.classList.remove(classes.borderBottom);
  }, [location, message, props.type]);

  return (
    <div
      className={classes["input-container"]}
      onClick={onFoucsHandler}
      onBlur={props.type === "email" ? onBlurHandler : onBlurHandlerTwo}
    >
      <input
        type={showPassword ? props.type : "text"}
        className={`${
          props.type === "email" ? emailInputClass : passwordInputClass
        } ${props.login ? "ps-4" : "ps-2"} pt-4 pb-2`}
        ref={inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={true}
        style={{
          backgroundColor: props.login ? "#333" : "",
          height: props.login ? "55px" : "60px",
          color: props.login ? "#fff" : "#000",
          width: props.login ? "100%" : "450px",
          borderTopRightRadius: props.login ? "3px" : "",
          borderBottomRightRadius: props.login ? "3px" : "",
        }}
      />
      <label
        className={props.login ? labelClassTwo : labelClass}
        style={{
          left: props.login ? "22px" : "8px",
          fontSize: props.login ? "18px" : "20px",
        }}
      >
        {props.labelP}
      </label>
      {props.value.trim().length !== 0 && props.type === "password" && (
        <abbr title={showPassword ? "Show Password" : "Hide Password"}>
          <button
            className={`${classes.show} text-uppercase px-2`}
            type="button"
            onClick={showPasswordHandler}
          >
            {showPassword ? "show" : "hide"}
          </button>
        </abbr>
      )}
      {props.hasError && (
        <p
          className={classes["error-message"]}
          style={{ fontSize: props.login ? "14px" : "18px" }}
        >
          {!message ? props.message : message}
        </p>
      )}
      {location && message.indexOf("EMAIL") !== -1 && props.type === "email" && (
        <p className={classes["error-message"]} style={{ fontSize: "14px" }}>
          {message}
        </p>
      )}
      {location &&
        message.indexOf("PASSWORD") !== -1 &&
        props.type === "password" && (
          <p className={classes["error-message"]} style={{ fontSize: "14px" }}>
            {message}
          </p>
        )}
      {/* check if email is exist in register page */}
      {!location &&
        message.indexOf("EMAIL") !== -1 &&
        props.type === "password" && (
          <p className={classes["error-message"]} style={{ fontSize: "18px" }}>
            {message}
          </p>
        )}
    </div>
  );
};

export default InputContainer;
