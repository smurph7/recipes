import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Home from '../pages';
import { recipeError } from '../constants';

const ingredients = [
  {
    name: 'cauliflower',
  },
  {
    name: 'capsicum',
  },
  {
    name: 'onion',
  },
];

const recipes = [
  {
    extendedIngredients: [
      {
        original: 'ingredient',
      },
    ],
    id: 19983,
    title: 'Pork & Green Salsa with Cheesy Hominy',
    readyInMinutes: 90,
    servings: 8,
    image: 'https://spoonacular.com/recipeImages/19983-312x231.jpg',
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step:
              'Cook chiles in large skillet 5 min. or until toasted, stirring frequently.',
          },
        ],
      },
    ],
  },
];

const props = { ingredients, recipes };

it('should render correctly', () => {
  render(<Home {...props} />);
});

it('should show recipe', () => {
  const wrapper = shallow(<Home {...props} />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  instance.displayRecipe();
  expect(instance.setState).toHaveBeenCalledWith({ isRecipeVisible: true });
});

it('should hide recipe', () => {
  const wrapper = shallow(<Home {...props} />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  instance.hideRecipe();
  expect(instance.setState).toHaveBeenCalledWith({ isRecipeVisible: false });
});

it('should show error message if recipes is empty', () => {
  const { getByTestId } = render(<Home {...{ ingredients, recipes: [] }} />);
  const error = getByTestId('error');
  expect(error).toBeInTheDocument();
});
