import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Home, { CardList, CheckboxList } from '../pages';
import * as api from '../pages/api';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
const result = [];
beforeEach(() => {
  jest.spyOn(api, 'getRecipeDetails').mockResolvedValue(result);
  jest.spyOn(api, 'getIngredientsList').mockResolvedValue(result);
});

it('should get ingredients and recipes on componentDidMount', () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'getIngredients').mockImplementationOnce(() => {});
  jest.spyOn(instance, 'getRecipes').mockImplementationOnce(() => {});
  instance.componentDidMount();
  expect(instance.getIngredients).toHaveBeenCalled();
  expect(instance.getRecipes).toHaveBeenCalled();
});

it('should set ingredients with result', async () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  await instance.getIngredients();
  expect(instance.setState).toHaveBeenCalledWith({ ingredientsList: result });
});

it('should set recipes with result', async () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  await instance.getRecipes();
  expect(instance.setState).toHaveBeenCalledWith({ recipes: result });
});

it('should show recipe', () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  const recipe = { title: 'pie' };
  jest.spyOn(instance, 'setState');
  instance.displayRecipe(recipe);
  expect(instance.setState).toHaveBeenCalledWith({
    isRecipeVisible: true,
    recipe,
  });
});

it('should hide recipe', () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  const recipe = {};
  jest.spyOn(instance, 'setState');
  instance.hideRecipe();
  expect(instance.setState).toHaveBeenCalledWith({
    isRecipeVisible: false,
    recipe,
  });
});

it('should show error message if recipes is empty', () => {
  const { getByTestId } = render(<Home />);
  const error = getByTestId('error');
  expect(error).toBeInTheDocument();
});

it('should return a list of cards', () => {
  const recipes = [
    {
      image: 'https://spoonacular.com/recipeImages/474463-312x231.jpg',
      title: 'Southwestern Chicken Taco Pie',
      id: '1',
    },
    {
      image: 'https://spoonacular.com/recipeImages/592479-312x231.jpg',
      title: 'Kale and Quinoa Salad with Black Beans',
      id: '2',
    },
  ];
  const wrapper = shallow(<CardList recipes={recipes} />);
  expect(wrapper).toHaveLength(2);
});

it('should update checked ingredients if it is not already in the list', () => {
  const ingredient = 'carrot';
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  instance.addCheckedIngredients(ingredient);
  expect(instance.setState).toHaveBeenCalledWith({
    checkedIngredients: [ingredient],
  });
});

it('should not update checked ingredients if it is already in the list', () => {
  const ingredient = 'carrot';
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({ checkedIngredients: [ingredient] });
  jest.spyOn(instance, 'setState');
  instance.addCheckedIngredients(ingredient);
  expect(instance.setState).not.toHaveBeenCalled();
});

it('should update recipes', () => {
  const ingredients = ['carrot', 'cheese'];
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({ checkedIngredients: ingredients });
  jest.spyOn(instance, 'getRecipes').mockImplementationOnce(() => {});
  instance.updateRecipes();
  expect(instance.getRecipes).toHaveBeenCalledWith(ingredients);
});

it('should return a list of cards', () => {
  const recipes = [
    {
      image: 'https://spoonacular.com/recipeImages/474463-312x231.jpg',
      title: 'Southwestern Chicken Taco Pie',
      id: '1',
    },
    {
      image: 'https://spoonacular.com/recipeImages/592479-312x231.jpg',
      title: 'Kale and Quinoa Salad with Black Beans',
      id: '2',
    },
  ];
  const wrapper = shallow(<CardList recipes={recipes} />);
  expect(wrapper).toHaveLength(2);
});

it('should return a list of checkboxes', () => {
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
  const wrapper = shallow(
    <CheckboxList ingredients={ingredients} onClick={jest.fn()} />
  );
  expect(wrapper).toHaveLength(3);
});
