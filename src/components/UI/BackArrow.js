import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import classes from "./BackArrow.module.css";

const BackArrow = () => {
  const navigate = useNavigate();

  // to back function
  const toBackHandler = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={`${classes.btn} ms-4 d-flex align-items-center justify-content-center`}
      onClick={toBackHandler}
    >
      <BsArrowLeft className="fs-2 fw-bolder" />
    </button>
  );
};

export default BackArrow;
