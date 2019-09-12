import {
  GET_COMICS,
  ADD_COMIC,
  DELETE_COMIC,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COMIC,
  FILTER_COMICS,
  CLEAR_FILTER,
  COMIC_ERROR,
  CLEAR_COMICS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_COMICS:
      return {
        ...state,
        comics: action.payload,
        loading: false
      };
    case ADD_COMIC:
      return {
        ...state,
        comics: [action.payload, ...state.comics],
        loading: false
      };
    case UPDATE_COMIC:
      return {
        ...state,
        comics: state.comics.map(comic =>
          comic._id === action.payload._id ? action.payload : comic
        ),
        loading: false
      };
    case DELETE_COMIC:
      return {
        ...state,
        comics: state.comics.filter(comic => comic._id !== action.payload),
        loading: false
      };
    case CLEAR_COMICS:
      return {
        ...state,
        comics: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_COMICS:
      return {
        ...state,
        filtered: state.comics.filter(comic => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return comic.name.match(regex) || comic.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case COMIC_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
