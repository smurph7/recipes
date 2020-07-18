import styles from './index.module.sass';

export const getCheckboxes = (ingredients) => {
  return ingredients.map((ingredient, index) => {
    return <Checkbox name={ingredient.name} id={index.toString()} key={index} />;
  });
};

export const Checkbox = ({ name, id }) => {
  return (
    <div className={styles.checkboxRow} key={id}>
      <div className={styles.checkbox}>
        <input
          data-testid={id}
          type="checkbox"
          name={`option${id}`}
          value={name}
        />
      </div>
      <p className={styles.text}>{name}</p>
    </div>
  );
};

const CheckboxList = ({ ingredients }) => {
  return getCheckboxes(ingredients);
};

export default CheckboxList;
