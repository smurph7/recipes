# Recipe Suggestions
This webpage suggests some recipes to try based on your selected ingredients.
Select/deselect ingredients to get new suggestions.
Open a recipe card to view the full recipe.

The list of ingredients are retrieved from a mock API using GitHub and JSONPlaceholder accessible here https://github.com/smurph7/ingredients-list

Recipes are retrieved from Spoonacular https://spoonacular.com/food-api

## Website
You can view the webpage here https://recipes-murex.vercel.app/

## Get started
Clone the repo and install dependencies
```bash
git clone https://github.com/smurph7/recipes.git

yarn
```

## Run locally
You will need an API key for spoonacular. You can sign up for one at https://spoonacular.com/food-api (it's free). 

Use it to replace the one in `pages/api/index.js` instead of `process.env.apiKey`
```bash
yarn dev
```

## Run Tests

```bash
yarn test
```
