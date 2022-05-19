import { NavLink } from "react-router-dom";
import arrayOfRecipes from "../data.js";
import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext.js";
import Filter from "./Filter";
import "./Recipes.css";
import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { UserContext } from "../contexts/UserContext.js";

const Pic = styled.div`
  width: 14em;
  height: 10em;
  background-image: url(${(props) => props.pic});
  background-position: center;
  background-size: 14em;
  grid-area: 1/1/3/2;
`;

export default function Recipes() {
  const { cat, searchTerm } = useContext(FilterContext);
  const { favorites, setFavorites, users, user } = useContext(UserContext);

  const catFilter = (item) => {
    if (!cat.meal && !cat.breakfast && !cat.snack) {
      return true;
    }
    if (cat[item.category]) {
      return true;
    }
    return false;
  };

  const searchFilter = (item) => {
    if (searchTerm === "") {
      return true;
    } 
    if (item.name.toLowerCase().includes(searchTerm)) {
      return true;
    }
  };

  function favoritesHandler(recipe) {
    if (!user) {
      return alert("please log in");
    }

    const isFavorite = favorites.find((item) => item.id === recipe.id);

    if (!isFavorite) {
      users.forEach((item) => {
        if (item.firstName === user.firstName) {
          item.favorites.push(recipe);
        }
      });

      setFavorites([...favorites, recipe]);
    } else {
      const updatedFavorites = favorites.filter(
        (item) => recipe.id !== item.id
      );

      //  console.log("updatetFav",updatedFavorites);
      setFavorites(updatedFavorites);
    }
  }
  // console.log("fav:", favorites);

  return (
    <div className="Recipes">
      <Filter />
      {arrayOfRecipes
        .filter(catFilter)
        .filter(searchFilter)
        .map((recipe) => (
          <div id="recipeList" key={recipe.id}>
            <Pic pic={recipe.pic} />
            <NavLink className="recipeLink" to={recipe.id + ""}>
              {" "}
              <div id="textBox">
                <h2>{recipe.name}</h2>
                <p>{recipe.info}</p>
              </div>
            </NavLink>
            {!favorites.find((item) => item.id === recipe.id) ? (
              <AiOutlineHeart
                id="favHeart"
                onClick={() => favoritesHandler(recipe)}
                //recipe={recipe}
              />
            ) : (
              <AiTwotoneHeart
                id="favHeart"
                onClick={() => favoritesHandler(recipe)}
                //recipe={recipe}
              />
            )}
          </div>
        ))}
    </div>
  );
}
