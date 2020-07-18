import axios from 'axios';
import { apiKey } from './apikey';

const maxNumberToReturn = '10';

export const getIngredientsList = async () => {
  return await axios
    .get(
      `https://my-json-server.typicode.com/smurph7/ingredients-list/ingredients`
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
};

export const getRandomRecipes = async () => {
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${maxNumberToReturn}`
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
};
