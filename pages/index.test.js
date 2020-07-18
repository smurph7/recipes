import React from 'react';
import Checkbox from './components/checkbox';
import { getCheckboxes } from '.';

describe('Home', () => {
  it('should return checkbox list', () => {
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
      <Checkbox id="0" name="cauliflower" />,
      <Checkbox id="1" name="capsicum" />,
      <Checkbox id="2" name="onion" />,
    ];
    expect(getCheckboxes(ingredients)).toEqual(expectedResult);
  });
});
