import React from 'react';
import Head from 'next/head';
import Card from '../components/card';
import CheckboxList from '../components/checkbox';
import Recipe from '../components/recipe';
import styles from './index.module.sass';
import { getIngredientsList, getRecipeDetails } from './api';
import { CancelOutlined } from '@material-ui/icons';
import { subTitle, recipeError } from '../constants';

export const CardList = ({ recipes, onClick }) => {
  return recipes.map((item) => {
    return (
      <Card
        key={item.id}
        props={{
          ...item,
          onClick: () => onClick(item),
        }}
      />
    );
  });
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    await getRecipeDetails(ingredients)
      .then((result) => {
        this.setState({ recipes: result });
      })
      .catch(() => {});
  };

  displayRecipe = (recipe) => {
    this.setState({ isRecipeVisible: true, recipe });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  hideRecipe = () => this.setState({ isRecipeVisible: false, recipe: {} });

  render() {
    const ingredients = this.state.ingredientsList;
    const recipes = this.state.recipes;
    const { isRecipeVisible, recipe } = this.state;

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
              <CheckboxList ingredients={ingredients} />
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
            <div className={styles.cardContainer}>
              {recipes.length === 0 && (
                <div data-testid="error" className={styles.text}>
                  <p>{recipeError}</p>
                </div>
              )}
              <CardList recipes={recipes} onClick={this.displayRecipe} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p>Powered by me</p>
        </div>
      </div>
    );
  }
}

export default Home;
