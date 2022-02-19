import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import logo from "../../components/assets/Netflix-Logo.png";

import classes from "./Info.module.css";
import BackArrow from "../../components/UI/BackArrow";

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allData = useSelector((state) => state.movies.allData);

  const queryParams = new URLSearchParams(location.search);
  const id = +queryParams.get("id");

  const singleItem = allData.find((item) => item.id === id);

  const watchHandler = () => {
    navigate("/watch");
  };

  const flexStyles = "d-flex align-items-center";

  const putData = !allData ? (
    <LoadingSpinner />
  ) : (
    <div className={classes.info}>
      <header>
        <BackArrow />
        <img src={singleItem.wallpaper} alt={singleItem.title} />
        <img className={classes.logo} src={logo} alt="Netflix Logo" />
        <div className={classes.container}>
          <div>
            <h1 className="text-capitalize">{singleItem.title}</h1>
            <span className="text-capitalize">
              by "{singleItem.details[0].director}"
            </span>
            <button
              type="button"
              className={`${flexStyles} px-2 py-1 text-capitalize mt-2 mb-4`}
              onClick={watchHandler}
            >
              watch now <FaPlay className="ms-2" />
            </button>
            <div
              className={`${classes.maturityRatings} ${flexStyles} justify-content-center fs-5 p-2`}
            >
              {singleItem.maturityRatings}
            </div>
          </div>
        </div>
      </header>
    </div>
  );

  return putData;
};

export default Info;
