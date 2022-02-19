import { Fragment } from "react";
import { useSelector } from "react-redux";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Header from "../../components/Header/Header";
import List from "../../components/List/List";

import classes from "./Movies.module.css";

// helper function to filter array
const filteredArray = (arr, type) => {
  return arr.filter((item) => item.typeOfEmployment === type);
};

const Movies = () => {
  const movies = useSelector((state) => state.movies.movieLists);

  // psychological movies
  const psychologicalTypes = filteredArray(movies, "psychological");
  // action movies
  const actionTypes = filteredArray(movies, "action");
  // sci-fi movies
  const sciFiTypes = filteredArray(movies, "sci-fi");
  // drama movies
  const dramaTypes = filteredArray(movies, "drama");
  // romance movies
  const romanceTypes = filteredArray(movies, "romance");

  let putData;
  if (!movies) {
    putData = <LoadingSpinner />;
  } else {
    putData = (
      <Fragment>
        {/* you must increase index + 1 if you add more "List" component to work details component correctly */}
        <List title="Action" data={actionTypes} index={0} />
        <List
          current="0"
          title="Psychological"
          data={psychologicalTypes}
          index={1}
        />
        <List title="Sci-fi" data={sciFiTypes} index={2} />
        <List title="Drama" data={dramaTypes} index={3} />
        <List title="Romance" data={romanceTypes} index={4} />
      </Fragment>
    );
  }

  return (
    <div className={classes.movies}>
      <Header />
      {putData}
    </div>
  );
};

export default Movies;
