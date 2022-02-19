import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./Home.module.css";

// get only ten lists
const sliceTenItems = (arr) => {
  return arr.slice(0, 10);
};

const Home = () => {
  const allData = useSelector((state) => state.movies.allData);
  const actionTypes = useSelector((state) => state.movies.actionTypes);
  const dramaTypes = useSelector((state) => state.movies.dramaTypes);
  const romanceTypes = useSelector((state) => state.movies.romanceTypes);

  let putData;
  if (!allData || !actionTypes || !dramaTypes || !romanceTypes) {
    putData = <LoadingSpinner />;
  } else {
    // randomize array
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let shuffled = useMemo(() => {
      return allData
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // make a data 10 max length
    let maxLists = sliceTenItems(shuffled);
    let maxActionList = sliceTenItems(actionTypes);
    let maxDramaList = sliceTenItems(dramaTypes);
    let maxRomanceList = sliceTenItems(romanceTypes);
    putData = (
      <Fragment>
        {/* you must increase index + 1 if you add more "List" component to work details component correctly */}
        <List title="Watch in One Weekend" data={maxLists} index={0} />
        <List title="Action Mix" data={maxActionList} index={1} />
        <List title="Drama Mix" data={maxDramaList} index={2} />
        <List title="Romance Mix" data={maxRomanceList} index={3} />
      </Fragment>
    );
  }

  return (
    <div className={classes.home}>
      <Header />
      {putData}
    </div>
  );
};

export default Home;
