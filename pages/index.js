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

const Home = ({ ingredients }) => {
  const props = {
    image: 'https://spoonacular.com/recipeImages/474463-312x231.jpg', //'https://spoonacular.com/recipeImages/584811-312x231.jpg',
    title: 'Southwestern Chicken Taco Pie',
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
          <div className={styles.cardContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.close}>
                <CancelOutlined fontSize="large" />
              </div>
              <Recipe />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
            <Card props={props} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>Powered by me</p>
      </div>
    </div>
  );
};

export default Home;
