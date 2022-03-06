import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";

import { FaPlay } from "react-icons/fa";
import { BiLike, BiDislike, BiCheck } from "react-icons/bi";
import { CgFileRemove } from "react-icons/cg";
import { MdClose, MdOutlineAdd } from "react-icons/md";

import classes from "./Details.module.css";
import { Link, useLocation } from "react-router-dom";
import { movieActions } from "../store/movie-slice";

let lists = ["overview", "details"];

const Details = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // ref to change span width element dynamic
  const spanRef = useRef();

  // ref to set active class to first child
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.children[0].classList.add(classes.active);
  }, []);

  // get item details
  const items = useSelector((state) => state.movies.objectsDetails);
  const singleItem = items[props.index];

  // function to hide trailer popup
  const hideTrailerHandler = (e) => {
    // match all previous items in list component NOT all
    const items = [
      ...e.currentTarget.parentElement.previousElementSibling.children[2]
        .children,
    ];

    // remove all "active-border" classes
    items.forEach((item) => {
      setTimeout(() => item.classList.remove("active-border"), 500);
    });

    ref.current.style.opacity = null;
    ref.current.style.maxHeight = null;

    // get id of Item to remove from array when click
    let id = singleItem.id;

    setTimeout(() => {
      btnRef.current.children[0].click();
      ref.current.style.display = "none";
      dispatch(movieActions.removeUniqueObject(id));
      window.scrollTo(0, ref.current.offsetTop - 350);
    }, 500);
  };

  // ref to show trailer video
  const containerRef = useRef();

  // function to get trailer
  const showMoreInfoHandler = (i, e) => {
    const btns = [...e.target.parentElement.children];
    btns.forEach((btn) => {
      btn.classList.remove(classes.active);
    });
    e.target.classList.add(classes.active);
    const pos = e.target.getBoundingClientRect();
    spanRef.current.style = `width: ${pos.width}px`;
    spanRef.current.setAttribute(
      "style",
      `transform: translateX(calc((${i * 100}%) + (${i * 50}px))); width: ${
        pos.width
      }px`
    );
    containerRef.current.style = `transform: translateX(${i * -50}%)`;
  };

  // add item to list
  const addToListHandler = (id) => {
    dispatch(movieActions.setListHandler({ id, index: props.index }));
  };

  // remove item from list
  const removeListHandler = (id) => {
    if (location.pathname.slice(1) === "my-list") {
      ref.current.style.opacity = null;
      ref.current.style.maxHeight = null;
    }
    dispatch(movieActions.removeItemfromList({ id, index: props.index }));
  };

  // text-capitalize style
  const txtCapitalize = "text-capitalize";

  // item info styles
  const itemStyles = "d-flex flex-column";

  // flex collection styles
  const flexCollection = "d-flex justify-content-center align-items-center";

  let setSingleItem;
  if (!singleItem) {
    setSingleItem = <LoadingSpinner />;
  } else {
    setSingleItem = (
      <div className={classes.container} ref={containerRef}>
        <div className={`${classes["left-container"]} d-flex s-4`}>
          <div className={`${classes.left} d-flex flex-column`}>
            <h1 className={txtCapitalize}>{singleItem.title}</h1>
            <div className="d-flex">
              <p>{singleItem.release}</p>
              <p className={`${classes.type} mx-3 ${txtCapitalize} px-1`}>
                {singleItem.type}
              </p>
              <p className={txtCapitalize}>{singleItem.time}</p>
            </div>
            <div className={classes.breif}>
              <p>{singleItem.breif}</p>
            </div>
            <div className={`${classes["btn-container"]} d-flex`}>
              <Link to="/watch">
                <FaPlay className={`me-2 ${txtCapitalize}`} /> play
              </Link>
              <button
                type="button"
                onClick={addToListHandler.bind(null, singleItem.id)}
                disabled={singleItem.inList}
                className={`${
                  singleItem.inList ? classes.check : ""
                } ${txtCapitalize}`}
              >
                {!singleItem.inList ? (
                  <MdOutlineAdd className="me-2" />
                ) : (
                  <BiCheck className="me-2" />
                )}{" "}
                my list
              </button>
              <button type="button">
                <BiLike />
              </button>
              <button type="button">
                <BiDislike />
              </button>
              {singleItem.inList && (
                <button
                  type="button"
                  onClick={removeListHandler.bind(null, singleItem.id)}
                >
                  <abbr className={flexCollection} title="Remove from list">
                    <CgFileRemove />
                  </abbr>
                </button>
              )}
            </div>
          </div>
          <div className={classes.right}>
            <img src={singleItem.image} alt={singleItem.title} />
          </div>
        </div>
        <div
          className={`${classes["right-container"]} d-flex ps-5 ${txtCapitalize}`}
        >
          <div className={itemStyles}>
            <h4>director</h4>
            <p>{singleItem.details[0].director}</p>
            <h4>cast</h4>
            {singleItem.details[1].cast.map((detail, index) => {
              return <p key={index}>{detail}</p>;
            })}
          </div>
          <div className={itemStyles}>
            <h4>writers</h4>
            {singleItem.details[2].writters.map((writter, index) => {
              return <p key={index}>{writter}</p>;
            })}
          </div>
          <div className={itemStyles}>
            <h4>geners</h4>
            <p>{singleItem.maturityRatings}</p>
          </div>
        </div>
      </div>
    );
  }

  const setLists = lists.map((list, index) => {
    return (
      <button
        key={index}
        type="button"
        onClick={showMoreInfoHandler.bind(null, index)}
        className="btns"
      >
        {list}
      </button>
    );
  });

  return (
    <div ref={ref} className={`${classes.details} d-flex`}>
      <button
        className={`${classes.close} ${flexCollection}`}
        type="button"
        onClick={hideTrailerHandler}
      >
        <MdClose />
      </button>
      <div className={classes.lists}>
        <div
          className={`${classes["btns-wrapper"]} d-flex justify-content-center`}
        >
          <div className={classes.control} ref={btnRef}>
            {setLists}
            <span ref={spanRef}></span>
          </div>
        </div>
      </div>
      {setSingleItem}
    </div>
  );
});

export default Details;
