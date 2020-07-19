import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import CheckboxList, { Checkbox } from '.';

it('should render the props passed in', () => {
  const name = 'Name';
  const id = '1';

  const { getByText, getByTestId } = render(<Checkbox name={name} id={id} />);
  const text = getByText(name);
  const testId = getByTestId(id);
  expect(text).toBeInTheDocument();
  expect(testId).toBeInTheDocument();
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
