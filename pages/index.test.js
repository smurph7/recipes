import React from 'react';
import { render } from '@testing-library/react';
import Home from '.';

describe('Home', () => {
  it('should render correctly', () => {
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
    render(<Home ingredients={ingredients} />);
  });
});
