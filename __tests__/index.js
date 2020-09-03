import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Home, { getStaticProps, updateIngredientList } from '../pages';
import * as api from '../pages/api';

const ingredients = [
  {
    name: 'cauliflower'
  },
  {
    name: 'capsicum'
  },
  {
    name: 'onion'
  }
];

const title1 = 'Pork & Green Salsa with Cheesy Hominy';
const title2 = 'Nama Chocolate';
const step1 =
  'Cook chiles in large skillet 5 min. or until toasted, stirring frequently.';
const step2 = 'Cut the chocolate';

const recipe1 = {
  extendedIngredients: [
    {
      original: 'ingredient'
    }
  ],
  id: 19983,
  title: title1,
  readyInMinutes: 90,
  servings: 8,
  image: 'https://spoonacular.com/recipeImages/19983-312x231.jpg',
  analyzedInstructions: [
    {
      steps: [
        {
          number: 1,
          step: step1
        }
      ]
    }
  ]
};

const recipe2 = {
  extendedIngredients: [
    {
      original: 'ingredient'
    }
  ],
  id: 19984,
  title: title2,
  readyInMinutes: 30,
  servings: 36,
  image: 'https://spoonacular.com/recipeImages/19983-312x231.jpg',
  analyzedInstructions: [
    {
      steps: [
        {
          number: 1,
          step: step2
        }
      ]
    }
  ]
};
const recipes = [recipe1, recipe2];

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

beforeEach(() => {
  jest.spyOn(api, 'getRecipeDetails').mockResolvedValue(recipes);
  jest.spyOn(api, 'getIngredientsList').mockResolvedValue(ingredients);
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderHome = props => {
  const homeProps = { ingredients, recipes, ...props };
  return render(<Home {...homeProps} />);
};

it('should get ingredients and recipes in static props', async () => {
  const props = await getStaticProps();
  expect(props).toEqual({ props: { ingredients, recipes } });
  expect(api.getRecipeDetails).toHaveBeenCalled();
  expect(api.getIngredientsList).toHaveBeenCalled();
});

it('should show recipe on click card', () => {
  const { getByText } = renderHome();
  fireEvent.click(getByText(title1));
  expect(getByText(step1)).toBeInTheDocument();
});

it('should hide recipe on click x', () => {
  const { getByText, getByTestId, queryByText } = renderHome();
  const title = getByText(title1);
  fireEvent.click(title);
  const close = getByTestId('close');
  fireEvent.click(close);
  expect(title).toBeInTheDocument();
  expect(queryByText(step1)).not.toBeInTheDocument();
});

it('should display recipes on load page', () => {
  const { getByText } = renderHome();
  expect(getByText(title1)).toBeInTheDocument();
  expect(getByText(title2)).toBeInTheDocument();
});

it('should show error message if recipes is empty', async () => {
  const { getByTestId } = renderHome();
  const option = getByTestId('option1');
  await act(async () => {
    jest.spyOn(api, 'getRecipeDetails').mockRejectedValueOnce([]);
    fireEvent.click(option);
  });
  expect(getByTestId('error')).toBeInTheDocument();
});

it('should show spinner when loading recipes', async () => {
  const { getByTestId } = renderHome();
  const option = getByTestId('option1');
  await act(async () => {
    fireEvent.click(option);
    await waitFor(() => {
      expect(getByTestId('spinner')).toBeInTheDocument();
    });
  });
});

it('should tick ingredients on click checkbox', async () => {
  const { getByTestId } = renderHome();
  const option = getByTestId('option1');
  expect(option.checked).toBeFalsy();
  await act(async () => {
    fireEvent.click(option);
  });
  expect(option.checked).toBeTruthy();
});

it('should add new checked ingredient to list if it is not already in the list', () => {
  const ingredient = 'onion';
  const checkedIngredients = [];
  const list = updateIngredientList(ingredient, checkedIngredients);
  expect(list).toContain(ingredient);
});

it('should remove unchecked ingredient from list if it is already in the list', () => {
  const ingredient = 'onion';
  const checkedIngredients = [ingredient];
  const list = updateIngredientList(ingredient, checkedIngredients);
  expect(list).not.toContain(ingredient);
});
