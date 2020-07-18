import Card from './components/card';
import styles from './index.module.sass';
import { getIngredientsList } from './api/ingredients';

export const getStaticProps = async () => {
  return getIngredientsList();
};

const Home = ({ ingredients }) => {
  const props = {
    image: 'https://spoonacular.com/recipeImages/474463-312x231.jpg', //'https://spoonacular.com/recipeImages/584811-312x231.jpg',
    title: 'Southwestern Chicken Taco Pie',
  };
  return (
    <div className={styles.cardContainer}>
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
      <Card props={props} />
    </div>
  );
};

export default Home;
