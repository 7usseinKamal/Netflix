import { createSlice } from "@reduxjs/toolkit";

const moviesState = {
  allData: [],
  tvShows: [],
  movieLists: [],
  myList: [],
  actionTypes: [],
  dramaTypes: [],
  romanceTypes: [],
  objectsDetails: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState: moviesState,
  reducers: {
    getData(state, action) {
      state.allData = action.payload;
    },
    setSeries(state) {
      const filterSeriesData = state.allData.filter(
        (item) => item.type === "series"
      );
      state.tvShows = filterSeriesData;
    },
    setMovies(state) {
      const filterMoviesData = state.allData.filter(
        (item) => item.type === "movie"
      );
      state.movieLists = filterMoviesData;
    },
    setUniqueObject(state, action) {
      const unique = state.allData.find(
        (item) => item.id === action.payload.id
      );
      state.objectsDetails[action.payload.index] = unique;
    },
    removeUniqueObject(state, action) {
      const remainingDetails = state.objectsDetails.filter(
        (item) => item.id !== action.payload
      );
      state.objectsDetails = remainingDetails;
    },
    clearUniqueObject(state) {
      state.objectsDetails = [];
    },
    setActionTypes(state) {
      let current = state.allData.filter(
        (item) => item.typeOfEmployment === "action"
      );
      state.actionTypes.push(...current);
    },
    setDramaTypes(state) {
      let current = state.allData.filter(
        (item) => item.typeOfEmployment === "drama"
      );
      state.dramaTypes.push(...current);
    },
    setRomanceTypes(state) {
      let current = state.allData.filter(
        (item) => item.typeOfEmployment === "romance"
      );
      state.romanceTypes.push(...current);
    },
    replaceList(state, action) {
      state.myList = action.payload;
    },
    setListHandler(state, action) {
      const singleItem = state.allData.find(
        (item) => item.id === action.payload.id
      );
      singleItem.inList = true;
      state.objectsDetails[action.payload.index].inList = true;
      state.myList.push(singleItem);
    },
    removeItemfromList(state, action) {
      const singleItem = state.allData.find(
        (item) => item.id === action.payload.id
      );
      singleItem.inList = false;
      state.objectsDetails[action.payload.index].inList = false;
      const restOfItems = state.myList.filter(
        (item) => item.id !== action.payload.id
      );
      state.myList = restOfItems;
    },
  },
});

export default movieSlice;

export const movieActions = movieSlice.actions;
