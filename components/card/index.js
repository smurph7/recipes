import styles from './index.module.sass';

export const Card = ({ props }) => {
  const { image, title, onClick } = props;
  return (
    <div onClick={onClick} className={styles.cardContainer}>
      <div className={styles.card}>
        <img className={styles.cardImage} src={image} alt={title} />
        <div className={styles.cardHeading}>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </div>
  );
};

const CardList = ({ recipes, onClick }) => {
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

export default CardList;
