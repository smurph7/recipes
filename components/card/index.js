import styles from './index.module.sass';

const Card = ({ props }) => {
  const { image, title } = props;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img className={styles.cardImage} src={image} alt={title} />
        <div className={styles.cardHeading}>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
