import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import useWindowSize from "../hooks/use-windowsize";

import Details from "./Details";
import LoadingSpinner from "../UI/LoadingSpinner";

import { FaPlay } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
} from "react-icons/io";

import { movieActions } from "../store/movie-slice";
import classes from "./List.module.css";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";

const List = ({ title, data, index }) => {
  const dispatch = useDispatch();
  // ref to move slider
  let currentRef = useRef(0);

  // state to show next button
  const [showBtn, setShowBtn] = useState(false);

  // state to control modal
  const [modal, setModal] = useState(false);

  // function to show next btn when mouse enter
  const showNextBtnHandler = () => {
    setShowBtn(true);
  };

  // function to show next btn when mouse leave
  const hideNextBtnHandler = () => {
    setShowBtn(false);
  };

  // state to control when show back button
  const [isShow, setIsShow] = useState(false);

  // ref to activate slider buttons
  const containerRef = useRef();

  // refs to show movie details like (info, time, rating, etc...) and active class
  const trailerRef = useRef();

  // function to show trailer popup
  const showTrailerHandler = (id, e) => {
    const items = [
      ...e.currentTarget.parentElement.parentElement.parentElement.children,
    ];

    // remove all "active-border" classes
    items.forEach((item) => {
      item.classList.remove("active-border");
    });

    // add "active-border" to specific item
    e.currentTarget.parentElement.parentElement.classList.add("active-border");

    dispatch(movieActions.setUniqueObject({ id: id, index: index }));
    trailerRef.current.style.opacity = 1;
    trailerRef.current.style.maxHeight = "400px";
    window.scrollTo(0, trailerRef.current.offsetTop - 150);
  };

  // import custom hook
  const { bool, size } = useWindowSize();

  useEffect(() => {
    if (size <= 767) {
      // get all items
      const items = [...document.getElementsByClassName(classes.item)];
      // get all details component that has style attribute
      const detailsOpens = [...document.querySelectorAll("*[style]")].slice(1);
      // get all items that has active-border class
      const activeItemsArray = items.filter((item) =>
        item.classList.contains("active-border")
      );
      // remove all "active-border" class from all items
      activeItemsArray.forEach((item) => {
        item.classList.remove("active-border");
      });
      // remove all details array
      detailsOpens.forEach((item) => {
        item.style.maxHeight = null;
      });
      dispatch(movieActions.clearUniqueObject());
    }
  }, [size, dispatch]);

  // check when to show modal
  useEffect(() => {
    if (window.innerWidth <= 767 && modal) {
      setModal(true);
    } else {
      setModal(false);
      document.body.style.overflowY = "scroll";
    }
  }, [size, modal]);

  // function to show modal
  const modalHandler = (id) => {
    if (window.innerWidth <= 767) {
      dispatch(movieActions.setUniqueObject({ id, index }));
      document.body.style.overflowY = "hidden";
      setModal(true);
    }
  };

  // map to array of movies
  let allMovies;
  if (!data) {
    allMovies = <LoadingSpinner />;
  } else {
    allMovies = data.map((item) => {
      return (
        <div
          key={item.id}
          className={classes.item}
          onClick={modalHandler.bind(null, item.id)}
        >
          <div className={classes.image}>
            <img src={item.cover} alt={item.title} />
          </div>
          <div className={classes.info}>
            <div className={classes.player}>
              <video autoPlay={true} muted={true} loop={true}>
                <source src={item.shortVideo} type="video/mp4" />
              </video>
            </div>
            <div
              className={`${classes.details} d-flex justify-content-between align-items-end mx-2`}
            >
              <div className="pb-2">
                <Link
                  to="/watch"
                  className={`${classes.icon} d-flex justify-content-center align-items-center`}
                >
                  <FaPlay className="ms-1" />
                </Link>
                <p className="text-capitalize">{item.title}</p>
              </div>
              <div
                className={`${classes["btns-container"]} d-flex flex-column pb-4`}
              >
                <button type="button">
                  <BiLike />
                </button>
                <button type="button">
                  <BiDislike />
                </button>
                <button type="button" className={classes.rate}>
                  {item.rate}
                </button>
              </div>
            </div>
            <button
              type="button"
              className={classes["show-info"]}
              onClick={showTrailerHandler.bind(null, item.id)}
            >
              <IoIosArrowDown className="svg" />
            </button>
          </div>
        </div>
      );
    });
  }

  // function forward button
  const nextBtnHandler = () => {
    if (currentRef.current >= data.length - 1 || (data.length < 2 && !bool)) {
      return;
    }
    setIsShow(true);
    currentRef.current++;
    containerRef.current.style =
      "transform: translateX(-" + 250 * currentRef.current + "px)";
  };

  // function back button
  const prevBtnHandler = () => {
    if (currentRef.current === 1) {
      setIsShow(false);
    }
    if (currentRef.current <= 0) {
      return;
    }
    currentRef.current--;
    containerRef.current.style =
      "transform: translateX(-" + 250 * currentRef.current + "px)";
  };

  return (
    <Fragment>
      {modal &&
        ReactDOM.createPortal(
          <Modal index={index} setModal={setModal} />,
          document.getElementById("modal")
        )}
      <div
        className={`${classes.wrapper} ms-5`}
        onMouseEnter={showNextBtnHandler}
        onMouseLeave={hideNextBtnHandler}
      >
        <div className={classes["btns-control"]}>
          {isShow && showBtn && (
            <button
              type="button"
              className={classes.left}
              onClick={prevBtnHandler}
            >
              <IoIosArrowBack />
            </button>
          )}
          {showBtn && (
            <button
              type="button"
              className={classes.right}
              onClick={nextBtnHandler}
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>
        <h4>{title}</h4>
        <div className={classes.container} ref={containerRef}>
          {allMovies}
        </div>
      </div>
      <Details ref={trailerRef} index={index} />
    </Fragment>
  );
};

export default List;
