import React from 'react';
import Head from 'next/head';
import CardList from '../components/card';
import CheckboxList from '../components/checkbox';
import Recipe from '../components/recipe';
import styles from './index.module.sass';
import { getIngredientsList, getRecipeDetails } from './api/api';
import { CancelOutlined } from '@material-ui/icons';
import { subTitle, recipeError } from '../constants';

export const getStaticProps = async () => {
  const ingredients = await getIngredientsList();
  const recipes = await getRecipeDetails();
  return { props: { ingredients, recipes } };
};

class Home extends React.Component {
  state = { isRecipeVisible: false };

  displayRecipe = () => this.setState({ isRecipeVisible: true });
  hideRecipe = () => this.setState({ isRecipeVisible: false });

  render() {
    const { ingredients, recipes } = this.props;
    const { isRecipeVisible } = this.state;

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
                  <Recipe />
                </div>
              </div>
            )}
            <div className={styles.cardContainer}>
              {recipes.length === 0 && (
                <div data-testid="error" className={styles.text}>
                  <p>{recipeError}</p>
                </div>
              )}
              <CardList
                recipes={recipes}
                onClick={() => this.displayRecipe()}
              />
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
