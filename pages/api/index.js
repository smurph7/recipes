import axios from 'axios';

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

export const getRecipes = async (ingredients) => {
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&number=${maxNumberToReturn}`
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
};

export const mapIngredientsToString = (ingredients) => {
  if (ingredients) {
    const list = ingredients.map((item) => item);
    return list.join(',+');
  }
  return '';
};

export const getRecipeDetails = async (ingredientsList) => {
  let ingredients = mapIngredientsToString(ingredientsList);
  const { results } = await getRecipes(ingredients);
  return results.map((item) => {
    const {
      id,
      image,
      title,
      extendedIngredients,
      analyzedInstructions,
      readyInMinutes,
      servings,
    } = item;
    return {
      id,
      image,
      title,
      extendedIngredients,
      analyzedInstructions,
      readyInMinutes,
      servings,
    };
  });
};
