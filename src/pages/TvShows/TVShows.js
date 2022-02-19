import { Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./TvShows.module.css";

// helper function to filter array
const filteredArray = (arr, type) => {
  return arr.filter((item) => item.typeOfEmployment === type);
};

const TVShows = () => {
  const tvShows = useSelector((state) => state.movies.tvShows);

  // drama series
  const dramaSeries = filteredArray(tvShows, "drama");
  // romance series
  const romanceSeries = filteredArray(tvShows, "romance");
  // fantasy series
  const fantasySeries = filteredArray(tvShows, "fantasy");
  // action series
  const actionSeries = filteredArray(tvShows, "action");
  // thriller series
  const thrillerSeries = filteredArray(tvShows, "thriller");

  let putData;
  if (!tvShows) {
    putData = <LoadingSpinner />;
  } else {
    putData = (
      <Fragment>
        {/* you must increase index + 1 if you add more "List" component to work details component correctly */}
        <List title="Drama" data={dramaSeries} index={0} />
        <List title="Romance" data={romanceSeries} index={1} />
        <List title="Fantasy" data={fantasySeries} index={2} />
        <List title="Action" data={actionSeries} index={3} />
        <List title="Thriller" data={thrillerSeries} index={4} />
      </Fragment>
    );
  }

  return (
    <div className={classes["tv-shows"]}>
      <Header />
      {putData}
    </div>
  );
};

export default TVShows;
