import React, { useState, Fragment, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LoadingSpinner from "./components/UI/LoadingSpinner";

import {
  getAllData,
  getList,
  sendData,
  sendList,
} from "./components/store/movie-actions";
import { movieActions } from "./components/store/movie-slice";
import { data } from "./data";
import { uiActions } from "./components/store/ui-slice";
import Logout from "./pages/Logout/Logout";

const Register = React.lazy(() => import("./pages/Membership/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const TVShows = React.lazy(() => import("./pages/TvShows/TVShows"));
const Movies = React.lazy(() => import("./pages/Movies/Movies.js"));
const MyList = React.lazy(() => import("./pages/MyList/MyList"));
const Lost = React.lazy(() => import("./pages/Lost/Lost"));
const Watch = React.lazy(() => import("./pages/Watch/Watch"));
const Info = React.lazy(() => import("./pages/Info/Info"));

let block = false;
let blockTwo = false;

const App = () => {
  // state to show navbar
  const [isNavbarShow, setIsNavbarShow] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  // ui error message
  const allData = useSelector((state) => state.movies.allData);
  const loading = useSelector((state) => state.ui);
  const myList = useSelector((state) => state.movies.myList);

  // user auth or not
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // effect to show navbar or not
  useEffect(() => {
    if (
      location.pathname.slice(1) === "home" ||
      location.pathname.slice(1) === "tv-shows" ||
      location.pathname.slice(1) === "movies" ||
      location.pathname.slice(1) === "my-list"
    ) {
      setIsNavbarShow(true);
    } else {
      setIsNavbarShow(false);
    }
  }, [location]);

  // change title
  useEffect(() => {
    if (isLoggedIn) {
      document.title = "Netflix";
    } else {
      document.title = "Netflix - Watch TV Shows Online, Watch Movies Online";
    }
  }, [isLoggedIn]);

  // effect to reset alert message
  useEffect(() => {
    if (
      location.pathname.slice(1) === "register" ||
      location.pathname.slice(1) === "login"
    ) {
      dispatch(uiActions.resetMessage());
    }
  }, [dispatch, location]);

  // effect to send data
  useEffect(() => {
    dispatch(sendData(data));
  }, [dispatch]);

  // effect to get data
  useEffect(() => {
    console.log(
      document.lastModified + " By %cHussein Kamal",
      "color: red; text-transform: uppercase"
    );
    dispatch(getAllData());
  }, [dispatch]);

  // dispatch action creator "action types"
  useEffect(() => {
    dispatch(movieActions.setSeries());
    dispatch(movieActions.setMovies());
    dispatch(movieActions.setActionTypes());
    dispatch(movieActions.setDramaTypes());
    dispatch(movieActions.setRomanceTypes());
    if (blockTwo) {
      dispatch(sendData(allData));
    }
    blockTwo = true;
  }, [dispatch, allData]);

  // send my list array
  useEffect(() => {
    if (block) {
      dispatch(sendList(myList));
    }
    block = true;
  }, [dispatch, myList]);

  // get list array
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  let layOut;
  if (loading.message === "Success") {
    layOut = (
      <Fragment>
        {isNavbarShow && isLoggedIn && <Navbar />}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {!isLoggedIn && <Route path="/logout" element={<Logout />} />}
            {/* Add navigation guards */}
            {isLoggedIn && (
              <Fragment>
                <Route path="/home" element={<Home />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="/watch" element={<Watch />} />
                {/^search\?id=\d{1,2}$/.test(
                  `${location.pathname.slice(1)}${location.search}`
                ) ? (
                  <Route path="/search" element={<Info />} />
                ) : (
                  <Route path="*" element={<Lost />} />
                )}
              </Fragment>
            )}
            <Route path="*" element={<Lost />} />
          </Routes>
        </Suspense>
      </Fragment>
    );
  } else {
    layOut = (
      <Fragment>
        {loading.isLoading && <LoadingSpinner />}
        <p className="error">{loading.message}</p>
      </Fragment>
    );
  }

  return layOut;
};

export default App;
