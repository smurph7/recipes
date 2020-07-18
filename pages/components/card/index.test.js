import React from 'react';
import { render } from '@testing-library/react';
import Card from '.';

describe('Card', () => {
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
});
