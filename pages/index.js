import React from 'react';
import Head from 'next/head';
import CardList from '../components/card';
import CheckboxList from '../components/checkbox';
import Recipe from '../components/recipe';
import styles from './index.module.sass';
import { getIngredientsList, getRecipeDetails } from './api';
import { CancelOutlined } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { subTitle, recipeError } from '../constants';

const Error = () => (
  <div className={styles.text}>
    <p>{recipeError}</p>
  </div>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ingredientsList: [],
      recipes: [],
      isRecipeVisible: false,
      recipe: {},
      checkedIngredients: [],
    };
  }

  componentDidMount() {
    this.getIngredients();
    this.getRecipes();
  }

  getIngredients = async () => {
    await getIngredientsList()
      .then((result) => {
        this.setState({ ingredientsList: result });
      })
      .catch(() => {});
  };

  getRecipes = async (ingredients) => {
    this.setState({ isLoading: true });
    await getRecipeDetails(ingredients)
      .then(async (result) => {
        await this.setState({ recipes: result, isLoading: false });
      })
      .catch(() => {});
  };

  updateCheckedIngredients = (ingredient) => {
    const newList = this.state.checkedIngredients;
    if (!newList.includes(ingredient)) {
      newList.push(ingredient);
    } else {
      const index = newList.indexOf(ingredient);
      newList.splice(index, 1);
    }
    this.setState({ checkedIngredients: newList });
    this.hideRecipe();
    this.updateRecipes();
  };

  updateRecipes = () => {
    this.getRecipes(this.state.checkedIngredients);
  };

  displayRecipe = (recipe) => {
    this.setState({ isRecipeVisible: true, recipe });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  hideRecipe = () => this.setState({ isRecipeVisible: false, recipe: {} });

  render() {
    const ingredients = this.state.ingredientsList;
    const recipes = this.state.recipes;
    const { isRecipeVisible, recipe, isLoading } = this.state;

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
              <CheckboxList
                ingredients={ingredients}
                onClick={this.updateCheckedIngredients}
              />
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
                      fontSize="large"
                      onClick={this.hideRecipe}
                    />
                  </div>
                  <Recipe recipe={recipe} />
                </div>
              </div>
            )}
            {isLoading ? (
              <div className={styles.cardContainer}>
                <CircularProgress />
              </div>
            ) : (
              <div className={styles.cardContainer}>
                {recipes.length === 0 && <Error />}
                <CardList recipes={recipes} onClick={this.displayRecipe} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    );
  }
}

export default Home;
