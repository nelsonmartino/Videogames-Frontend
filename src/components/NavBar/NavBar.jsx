import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import {
  filterByGenre,
  filterByOrigin,
  resetFilter,
  orderByName,
  orderByRating,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../index";
import { URL_BACKEND } from "../../utils/backend";

function NavBar() {
  const dispatch = useDispatch();

  const location = useLocation();

  const [genres, setGenres] = useState([]);

  const [defaultValue, setDefaultValue] = useState({
    origin: "allGames",
    genre: "allGames",
    name: "allGames",
    rating: "allGames",
  });

  useEffect(() => {
    async function apiReq() {
      try {
        const { data } = await axios.get(`${URL_BACKEND}/genres`);
        setGenres(data);
      } catch (error) {
        alert(error);
      }
    }
    apiReq();
  }, []);

  const originHandler = (event) => {
    const origin = event.target.value;
    setDefaultValue({
      origin: origin,
      genre: "allGames",
      name: "allGames",
      rating: "allGames",
    });
    if (origin === "allGames") {
      dispatch(resetFilter());
    } else {
      dispatch(filterByOrigin(origin));
    }
  };

  const genreHandler = (event) => {
    const genre = event.target.value;
    setDefaultValue({
      origin: "allGames",
      genre: genre,
      name: "allGames",
      rating: "allGames",
    });
    if (genre === "allGames") {
      dispatch(resetFilter());
    } else {
      dispatch(filterByGenre(genre));
    }
  };

  const nameHandler = (event) => {
    const order = event.target.value;
    setDefaultValue({ ...defaultValue, name: order, rating: "allGames" });
    if (order === "allGames") {
      dispatch(resetFilter());
    } else {
      dispatch(orderByName(order));
    }
  };

  const ratingHandler = (event) => {
    const order = event.target.value;
    setDefaultValue({ ...defaultValue, rating: order, name: "allGames" });
    if (order === "allGames") {
      dispatch(resetFilter());
    } else {
      dispatch(orderByRating(order));
    }
  };

  return (
    <div className={style.navBar}>
      <div className={style.levelOne}>
        <div className={style.access}>
          <Link to="/home">
            <div className={style.text}>HOME</div>
          </Link>
          <Link to="/create">
            <div className={style.text}>CREATE</div>
          </Link>
        </div>
        {location.pathname === "/home" && (
          <div className={style.searchbar}>
            <SearchBar setDefaultValue={setDefaultValue} />
          </div>
        )}
      </div>
      {location.pathname === "/home" && (
        <div className={style.levelTwo}>
          <div className={style.filters}>
            <select value={defaultValue.origin} onChange={originHandler}>
              <option value="allGames">Filter By Origin</option>
              <option value="database">Database</option>
              <option value="api">API</option>
            </select>
            <select value={defaultValue.genre} onChange={genreHandler}>
              <option value="allGames">Filter By Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.orderers}>
            <select value={defaultValue.name} onChange={nameHandler}>
              <option value="allGames">Order By Name</option>
              <option value="Ascendant">A...Z</option>
              <option value="Descendant">Z...A</option>
            </select>
            <select value={defaultValue.rating} onChange={ratingHandler}>
              <option value="allGames">Order By Rating</option>
              <option value="Ascendant">Ascendant</option>
              <option value="Descendant">Descendant</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
