import { movieActions } from "./movie-slice";
import { uiActions } from "./ui-slice";

// sendData
export const sendData = (data) => {
  return async () => {
    const sendMovies = async () => {
      const response = await fetch(
        "https://netflix-9d0d7-default-rtdb.firebaseio.com/movies.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
          "Content-Type": "application/json",
        }
      );

      if (!response.ok) {
        throw new Error("Error!");
      }
    };

    try {
      sendMovies();
    } catch (err) {
      console.log(err.message);
    }
  };
};

// get data
export const getAllData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        uiActions.setLoading({
          status: true,
          message: "",
        })
      );
      const response = await fetch(
        "https://netflix-9d0d7-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const successData = await fetchData();
      dispatch(movieActions.getData(successData));
      dispatch(
        uiActions.removeLoading({
          status: false,
          message: "Success",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.removeLoading({
          status: false,
          message: err.message,
        })
      );
    }
  };
};

// send my list array
export const sendList = (data) => {
  return async () => {
    const sendListItems = async () => {
      const response = await fetch(
        "https://netflix-9d0d7-default-rtdb.firebaseio.com/list.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
          "Content-type": "application/json",
        }
      );

      if (!response.ok) {
        throw new Error("Send data failed!");
      }
    };

    try {
      sendListItems();
    } catch (err) {
      console.log(err.message);
    }
  };
};

// get list array
export const getList = () => {
  return async (dispatch) => {
    const getDataBack = async () => {
      const response = await fetch(
        "https://netflix-9d0d7-default-rtdb.firebaseio.com/list.json"
      );

      if (!response.ok) {
        throw new Error("Fetch failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const successData = await getDataBack();
      dispatch(movieActions.replaceList(successData || []));
    } catch (err) {
      dispatch(uiActions.setLoading({ status: true, message: err.message }));
    }
  };
};
