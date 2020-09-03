import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import Head from 'next/head';
import CardList from '../components/card';
import CheckboxList from '../components/checkbox';
import Recipe from '../components/recipe';
import styles from './index.module.sass';
import { getIngredientsList, getRecipeDetails } from './api';
import { CancelOutlined } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { subTitle, recipeError } from '../constants';

export const getServerSideProps = async () => {
  const ingredients = await getIngredientsList();
  const recipes = await getRecipeDetails();
  return { props: { ingredients, recipes } };
};

const Error = () => (
  <div data-testid="error" className={styles.text}>
    <p>{recipeError}</p>
  </div>
);

export const updateIngredientList = (ingredient, checkedIngredients) => {
  const newList = checkedIngredients;
  if (!newList.includes(ingredient)) {
    newList.push(ingredient);
  } else {
    const index = newList.indexOf(ingredient);
    newList.splice(index, 1);
  }
  return newList;
};

const Home = ({ recipes, ingredients }) => {
  const ingredientsQuery =  useQuery('ingredients', getIngredientsList, {
    initialData: ingredients,
    initialStale: true
  });

  const [isRecipeVisible, setRecipeVisible] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [recipeList, setRecipeList] = useState(recipes);
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);

  const showRecipe = () => setRecipeVisible(true);
  const hideRecipe = () => setRecipeVisible(false);

  const updateCheckedIngredients = ingredient => {
    const newList = updateIngredientList(ingredient, checkedIngredients);
    setCheckedIngredients(newList);
    hideRecipe();
    updateRecipes();
  };

  const updateRecipes = () => {
    getRecipes(checkedIngredients);
  };

  const getRecipes = ingredients => {
    setLoading(true);
    getRecipeDetails(ingredients)
      .then(async result => {
        setRecipeList(result);
        setLoading(false);
      })
      .catch(async () => {
        setRecipeList([]);
        setLoading(false);
      });
  };

  const displayRecipe = recipe => {
    showRecipe();
    setRecipe(recipe);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Head>
        <title>Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.ingredientsContainer}>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxListTitle}>
              <p>Your Ingredients</p>
            </div>
            {ingredientsQuery.isLoading ? (
              <p>Loading ingredients...</p>
            ) : (
              <CheckboxList
                ingredients={ingredientsQuery.data}
                onClick={updateCheckedIngredients}
              />
            )}
          </div>
        </div>
        <div className={styles.recipeContainer}>
          <div className={styles.heading}>
            <p className={styles.title}>Recipes</p>
            <p className={styles.text}>{subTitle}</p>
          </div>
          {isRecipeVisible && (
            <div className={styles.cardContainer}>
              <div className={styles.recipeCard}>
                <div className={styles.close}>
                  <CancelOutlined
                    data-testid="close"
                    fontSize="large"
                    onClick={hideRecipe}
                  />
                </div>
                <Recipe recipe={recipe} />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className={styles.cardContainer}>
              <CircularProgress data-testid="spinner" />
            </div>
          ) : (
            <div className={styles.cardContainer}>
              {recipeList.length === 0 && <Error />}
              <CardList recipes={recipeList} onClick={displayRecipe} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}></div>
      <ReactQueryDevtools />
    </div>
  );
};

export default Home;
