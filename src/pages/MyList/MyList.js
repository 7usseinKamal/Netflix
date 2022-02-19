import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";

import { ImFilesEmpty } from "react-icons/im";

import classes from "./MyList.module.css";

const MyList = () => {
  const myList = useSelector((state) => state.movies.myList);
  let putData;
  if (myList.length === 0) {
    putData = (
      <div className="d-flex justify-content-center">
        <h1 className={`${classes.h1} text-uppercase`}>
          my list is empty <ImFilesEmpty />
        </h1>
      </div>
    );
  } else {
    putData = (
      <Fragment>
        <Header />
        <List title="My List" data={myList} index={0} />
      </Fragment>
    );
  }

  return <div className={classes["my-list"]}>{putData}</div>;
};

export default MyList;
