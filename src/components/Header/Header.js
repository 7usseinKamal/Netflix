import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";

import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

import classes from "./Header.module.css";

// random background
let random = Math.random();

const randomArrFn = (arr) => {
  return arr[Math.floor(random * arr.length)];
};

const Header = () => {
  const location = useLocation();

  const movies = useSelector((state) => state.movies.allData);
  const tvShows = useSelector((state) => state.movies.tvShows);
  const movieLists = useSelector((state) => state.movies.movieLists);
  const myList = useSelector((state) => state.movies.myList);

  // match pathname without "/"
  const currentPath = location.pathname.slice(1);

  let changableImg;
  if (currentPath === "home") {
    changableImg = randomArrFn(movies);
  } else if (currentPath === "tv-shows") {
    changableImg = randomArrFn(tvShows);
  } else if (currentPath === "movies") {
    changableImg = randomArrFn(movieLists);
  } else if (currentPath === "my-list") {
    changableImg = randomArrFn(myList);
  }

  if (!changableImg || movies.length === 0) {
    return <LoadingSpinner />;
  } else {
    return (
      <header className="mb-5">
        <img src={changableImg.wallpaper} alt={changableImg.title} />
        <div className={`${classes.information} d-flex flex-column`}>
          <h1 className={`${classes.h} text-uppercase`}>
            {changableImg.title}
          </h1>
          <p>{changableImg.breif}</p>
          <div className={classes["btns-container"]}>
            <Link to="/watch" className="me-3">
              <FaPlay className="me-2" />
              play
            </Link>
            <button type="button">
              <BsInfoCircle className="me-2 fs-5" /> more info
            </button>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
