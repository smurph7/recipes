import Head from 'next/head';
import Card from './components/card';
import CheckboxList from './components/checkbox';
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
    <div>
      <div className={styles.header}>
        <p className={styles.title}>Recipes</p>
        <div className={styles.headerRight}></div>
      </div>
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
          <Head>
            <title>Recipes</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <p className={styles.text}>
            {`Here are some recipes you might like to try!\nSelect from the ingredients you have on hand to find recipes tailored to you.`}
          </p>

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

// const Home = ({ ingredients }) => {
//   return (
// <div class={styles.cardContainer}>
//   <div class={styles.card}>
//     <div class={styles.cardImage}>
//       <img src="http://placehold.it/250x300" alt="Card Image" />
//     </div>

//     <div class={styles.cardBody}>
//       <div class={styles.cardHeading}>
//         <p>Recipe Title</p>
//       </div>
//       <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//     </div>
//   </div>
// </div>
//   );
// };

// <div className={styles.container}>
// <Head>
//   <title>Recipes</title>
//   <link rel="icon" href="/favicon.ico" />
// </Head>

//   <main>
//     {/* <div className={styles.heading}> */}
//       <h1 className={styles.title}>Recipes</h1>
//       <p className={styles.description}>Your Ingredients</p>
//     {/* </div> */}

//     <div className={styles.grid}>
//       <a href="https://nextjs.org/docs" className={styles.card}>
//         <h3>Documentation &rarr;</h3>
//         <p>Find in-depth information about Next.js features and API.</p>
//       </a>

//       <a href="https://nextjs.org/learn" className={styles.card}>
//         <h3>Learn &rarr;</h3>
//         <p>Learn about Next.js in an interactive course with quizzes!</p>
//       </a>

//       <a
//         href="https://github.com/vercel/next.js/tree/master/examples"
//         className={styles.card}
//       >
//         <h3>Examples &rarr;</h3>
//         <p>Discover and deploy boilerplate example Next.js projects.</p>
//       </a>

//       <a href="https://vercel.com/import/nextjs" className={styles.card}>
//         <h3>Deploy &rarr;</h3>
//         <p>
//           Instantly deploy your Next.js site to a public URL with Vercel.
//         </p>
//       </a>
//     </div>
//   </main>
// </div>
