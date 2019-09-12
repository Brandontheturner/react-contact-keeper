import React, { useReducer } from "react";
import axios from "axios";
import ComicContext from "./comicContext";
import comicReducer from "./comicReducer";
import {
  GET_COMICS,
  ADD_COMIC,
  DELETE_COMIC,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COMIC,
  FILTER_COMICS,
  CLEAR_COMICS,
  CLEAR_FILTER,
  COMIC_ERROR
} from "../types";

const ComicState = props => {
  const initialState = {
    comics: null,
    current: null,
    filtered: null,
    error: null
  };
  //state allows us to access anything in our state
  //dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(comicReducer, initialState);

  // Get Comics
  const getComics = async () => {
    try {
      const res = await axios.get("/api/comics");

      dispatch({ type: GET_COMICS, payload: res.data });
    } catch (err) {
      dispatch({
        type: COMIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Comic
  const addComic = async comic => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/comics", comic, config);

      dispatch({ type: ADD_COMIC, payload: res.data });
    } catch (err) {
      dispatch({
        type: COMIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Delete Comic
  const deleteComic = async id => {
    try {
      await axios.delete(`/api/comics/${id}`);

      dispatch({
        type: DELETE_COMIC,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: COMIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Update Comic
  const updateComic = async comic => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/comics/${comic._id}`, comic, config);

      dispatch({
        type: UPDATE_COMIC,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Comics
  const clearComics = () => {
    dispatch({ type: CLEAR_COMICS });
  };

  //Set Current Comic
  const setCurrent = comic => {
    dispatch({ type: SET_CURRENT, payload: comic });
  };

  //Clear current Comic
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Comics
  const filterComics = text => {
    dispatch({ type: FILTER_COMICS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ComicContext.Provider
      value={{
        comics: state.comics,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addComic,
        deleteComic,
        setCurrent,
        clearCurrent,
        updateComic,
        filterComics,
        clearFilter,
        getComics,
        clearComics
      }}
    >
      {props.children}
    </ComicContext.Provider>
  );
};

export default ComicState;
