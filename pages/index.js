import React, { useState } from 'react';
import Head from 'next/head';
import Card from '../components/card';
import CheckboxList from '../components/checkbox';
import Recipe from '../components/recipe';
import styles from './index.module.sass';
import { getIngredientsList } from './api/ingredients';
import { CancelOutlined } from '@material-ui/icons';

export const getStaticProps = async () => {
  return getIngredientsList();
};

class Home extends React.Component {
  state = { isRecipeVisible: false };

  displayRecipe = () => this.setState({ isRecipeVisible: true });
  hideRecipe = () => this.setState({ isRecipeVisible: false });

  render() {
    const { ingredients } = this.props;
    const { isRecipeVisible } = this.state;
    const recipes = [{ one: '1' }];
    const cardProps = {
      image: 'https://spoonacular.com/recipeImages/474463-312x231.jpg', //'https://spoonacular.com/recipeImages/584811-312x231.jpg',
      title: 'Southwestern Chicken Taco Pie',
      recipeId: '1',
      onClick: this.displayRecipe,
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
              <CheckboxList ingredients={ingredients} />
            </div>
          </div>
          <div className={styles.recipeContainer}>
            <div className={styles.heading}>
              <p className={styles.title}>Recipes</p>
              <p className={styles.text}>
                {`Here are some recipes you might like to try!\nSelect from the ingredients you have on hand to find recipes tailored to you.`}
              </p>
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
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
              <Card props={cardProps} />
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
