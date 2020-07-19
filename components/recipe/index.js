import styles from './index.module.sass';
import { capitaliseFirstLetter } from '../../utils';
import { Person, Timer } from '@material-ui/icons';

export const IngredientsList = ({ ingredients }) => {
  const listItem = ingredients.map((item, key) => (
    <li className={styles.text} key={key}>
      {capitaliseFirstLetter(item.original)}
    </li>
  ));
  return <ul className={styles.ingredientsList}>{listItem}</ul>;
};

export const StepList = ({ steps }) => {
  const list = steps[0].map((item, key) => {
    return (
      <li className={styles.text} key={key}>
        {item}
      </li>
    );
  });
  return <ol>{list}</ol>;
};

export const getInstructions = (instructions) => {
  return instructions.map((item) => {
    return item.steps.map((steps) => {
      return steps.step;
    });
  });
};

const Recipe = ({ recipe }) => {
  const ingredients = recipe.extendedIngredients;
  const steps = getInstructions(recipe.analyzedInstructions);

  return (
    <div className={styles.recipe}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img className={styles.image} src={recipe.image} alt={'title'} />
          <p className={styles.headingText}>Ingredients</p>
          <IngredientsList ingredients={ingredients} />
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{recipe.title}</p>
          <div className={styles.detailRow}>
            <div className={styles.detailContainer}>
              <Person />
              <p className={styles.detailText}>{recipe.servings} Servings</p>
            </div>
            <div className={styles.detailContainer}>
              <Timer />
              <p className={styles.detailText}>
                {recipe.readyInMinutes} minutes
              </p>
            </div>
          </div>

          <p className={styles.headingText}>Method</p>
          <StepList steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
