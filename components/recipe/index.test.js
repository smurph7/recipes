import React from 'react';
import { render } from '@testing-library/react';
import { IngredientsList, StepList, getInstructions } from '.';

it('should return ingredients list', () => {
  const original = '1/2 cup carrots';
  const ingredients = [
    {
      original,
    },
  ];
  const { getByText } = render(<IngredientsList ingredients={ingredients} />);
  const ingredient = getByText(original);
  expect(ingredient).toBeInTheDocument();
});

it('should return step list', () => {
  const steps = [['step1', 'step2']];
  const { getByText } = render(<StepList steps={steps} />);
  const step1 = getByText('step1');
  const step2 = getByText('step2');
  expect(step1).toBeInTheDocument();
  expect(step2).toBeInTheDocument();
});

it('should return analyzed instructions array', () => {
  const step1 = 'step 1';
  const step2 = 'step2';
  const instructions = [{ steps: [{ step: step1 }, { step: step2 }] }];
  expect(getInstructions(instructions)).toEqual([[step1, step2]]);
});
