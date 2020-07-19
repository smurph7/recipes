import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import CardList, { Card } from '.';

it('should render the props passed in', () => {
  const props = {
    title: 'title',
    image: 'image',
  };

  const { getByText, getByAltText } = render(<Card props={props} />);
  const title = getByText(props.title);
  const image = getByAltText(props.title);
  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
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
  const wrapper = shallow(<CardList recipes={recipes} onClick={jest.fn()}/>);
  expect(wrapper).toHaveLength(2);
});
