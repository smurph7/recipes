import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from '.';

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
});
