import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./Input.module.css";

const Input = ({ toggle }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  const keyword = useRef("");
  const allData = useSelector((state) => state.movies.allData);

  const showSearch = toggle ? classes.show : "";

  useEffect(() => {
    if (!toggle) {
      inputRef.current.value = "";
    }
  }, [toggle]);

  const keyupHandler = (e) => {
    keyword.current = e.target.value.toLowerCase();
    if (keyword.current.trim().length > 0) {
      setShow(true);
      setData(
        allData.filter((item) => {
          let title = item.title.toLowerCase();
          return title.indexOf(keyword.current) > -1;
        })
      );
    } else {
      setShow(false);
      setData([]);
    }
  };

  const getSingleItem = (id) => {
    navigate(`/search?id=${id}`);
  };

  useEffect(() => {
    const clickHandler = (e) => {
      if (!e.target.classList.contains(classes.search)) {
        setShow(false);
      }
    };

    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  // padding styles
  const paddingStyles = "px-3 py-2";

  const setFilteredData =
    data.length > 0 ? (
      data.map((item) => {
        const regexp = new RegExp(keyword.current, "g");
        const matches = item.title.match(regexp);
        let parts = item.title.split(
          new RegExp(`${keyword.current.replace()}`, "g")
        );
        for (let i = 0; i < parts.length; i++) {
          if (i !== parts.length - 1) {
            let match = matches[i];
            while (parts[i + 1] === "" && parts[i + 2] === "") {
              match += matches[++i];
            }
            parts[i] = (
              <Fragment key={i}>
                {parts[i]}
                <span className={classes.highlighted}>{match}</span>
              </Fragment>
            );
          }
        }
        return (
          <div
            key={item.id}
            className={`${classes.param} ${paddingStyles}`}
            onClick={getSingleItem.bind(null, item.id)}
          >
            {parts}
          </div>
        );
      })
    ) : (
      <p className={`${classes.wrong} ${paddingStyles}`}>
        Your parameter is wrong
      </p>
    );

  return (
    <div className={classes.container}>
      <input
        type="search"
        className={`${classes["input-search"]} ${showSearch} ps-1`}
        placeholder="Search..."
        ref={inputRef}
        onChange={keyupHandler}
      />
      {show && (
        <div className={`${classes.search} text-capitalize`}>
          {setFilteredData}
        </div>
      )}
    </div>
  );
};

export default Input;
