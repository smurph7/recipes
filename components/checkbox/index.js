import styles from './index.module.sass';
import { capitaliseFirstLetter } from '../../utils';

export const getCheckboxes = (ingredients) => {
  return ingredients.map((ingredient, index) => {
    return (
      <Checkbox name={ingredient.name} id={index.toString()} key={index} />
    );
  });
};

export const Checkbox = ({ name, id }) => {
  const nameString = capitaliseFirstLetter(name);
  return (
    <div className={styles.checkboxRow} key={id}>
      <div className={styles.checkbox}>
        <input
          className={styles.square}
          data-testid={id}
          type="checkbox"
          name={`option${id}`}
          value={name}
        />
      </div>
      <p className={styles.text}>{nameString}</p>
    </div>
  );
};

const CheckboxList = ({ ingredients }) => {
  return getCheckboxes(ingredients);
};

export default CheckboxList;
