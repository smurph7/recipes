import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox, getCheckboxes } from '.';

describe('Checkbox', () => {
  it('should render the props passed in', () => {
    const name = 'name';
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
    const expectedResult = [
      <Checkbox id="0" name="cauliflower" key={0} />,
      <Checkbox id="1" name="capsicum" key={1} />,
      <Checkbox id="2" name="onion" key={2} />,
    ];
    expect(getCheckboxes(ingredients)).toEqual(expectedResult);
  });
});
