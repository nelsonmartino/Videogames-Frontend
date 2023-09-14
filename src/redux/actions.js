import axios from "axios";
import { URL_BACKEND } from "../utils/backend";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const RESET_FILTER = "RESET_FILTER";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const FILTER_ACTION = "FILTER_ACTION";

export const getVideogames = (setIsLoading) => {
  return async function (dispatch) {
    try {
      setIsLoading && setIsLoading(true);
      const { data } = await axios.get(`${URL_BACKEND}/videogames`);
      setIsLoading && setIsLoading(false);
      dispatch({ type: GET_VIDEOGAMES, payload: data });
    } catch (error) {
      setIsLoading && setIsLoading(false);
      alert(error);
    }
  };
};

export const filterAction = (filter) => {
  return { type: FILTER_ACTION, payload: filter };
};

export const orderByName = (order) => {
  return { type: ORDER_BY_NAME, payload: order };
};

export const orderByRating = (order) => {
  return { type: ORDER_BY_RATING, payload: order };
};

export const searchGames = (word, setPage) => {
  return async function (dispatch) {
    axios
      .get(`${URL_BACKEND}/videogames/name?search=${word}`)
      .then((res) => {
        dispatch({ type: SEARCH_VIDEOGAMES, payload: res.data })
        setPage(1)
      })
      .catch((error) => alert(error));
  };
};

export const deleteVideogame = (id) => {
  return async function (dispatch) {
    axios
      .delete(`${URL_BACKEND}/videogames/${id}`)
      .then((res) => dispatch({ type: DELETE_VIDEOGAME, payload: res.data }))
      .catch((error) => alert(error));
  };
};

export const resetFilter = () => {
  return { type: RESET_FILTER };
};
