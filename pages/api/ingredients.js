import axios from 'axios';

export const getIngredientsList = async () => {
  const ingredients = await axios
    .get(
      `https://my-json-server.typicode.com/smurph7/ingredients-list/ingredients`
    )
    .then((res) => {
      return res.data;
    });
  return {
    props: { ingredients },
  };
};
