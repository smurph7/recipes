import styles from './index.module.sass';
import { capitaliseFirstLetter } from '../../utils';

export const Checkbox = ({ name, id, onClick }) => {
  const nameString = capitaliseFirstLetter(name);
  return (
    <div className={styles.checkboxRow} key={id}>
      <div className={styles.checkbox}>
        <input
          className={styles.square}
          data-testid={`option${id}`}
          type="checkbox"
          name={`option${id}`}
          value={name}
          onClick={onClick}
        />
      </div>
      <p className={styles.text}>{nameString}</p>
    </div>
  );
};

const CheckboxList = ({ ingredients, onClick }) => {
  return ingredients.map((ingredient, index) => {
    return (
      <Checkbox
        name={ingredient.name}
        id={index.toString()}
        key={index}
        onClick={() => onClick(ingredient.name)}
      />
    );
  });
};

export default CheckboxList;
