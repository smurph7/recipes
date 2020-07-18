import styles from './index.module.sass';

const Checkbox = ({ name, id }) => {
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

export default Checkbox;
