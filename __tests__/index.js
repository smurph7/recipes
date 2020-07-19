import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from '../pages';
import * as api from '../pages/api';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
const result = [];

beforeEach(() => {
  jest.spyOn(api, 'getRecipeDetails').mockResolvedValue(result);
  jest.spyOn(api, 'getIngredientsList').mockResolvedValue(result);
});

afterEach(() => {
  jest.clearAllMocks();
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
  expect(instance.setState).toHaveBeenCalledWith({
    recipes: result,
    isLoading: false,
  });
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
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({ recipes: [], isLoading: false });
  expect(wrapper.find('Error')).toHaveLength(1);
});

it('should show spinner if loading is true', () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({ recipes: [], isLoading: true });
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
});

it('should add checked ingredients if it is not already in the list', () => {
  const ingredient = 'carrot';
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'setState');
  instance.updateCheckedIngredients(ingredient);
  expect(instance.setState).toHaveBeenCalledWith({
    checkedIngredients: [ingredient],
  });
});

it('should remove checked ingredients if it is already in the list', () => {
  const ingredients = ['carrot', 'cheese', 'corn'];
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({ checkedIngredients: ingredients });
  jest.spyOn(instance, 'setState');
  instance.updateCheckedIngredients('corn');
  expect(instance.setState).toHaveBeenCalledWith({
    checkedIngredients: ['carrot', 'cheese'],
  });
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
