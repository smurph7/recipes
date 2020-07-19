import * as api from '.';

it('should map ingredients to string for api query', () => {
  const ingredients = [{ name: 'cheese' }, { name: 'corn' }, { name: 'bread' }];
  const expectedResponse = 'cheese,+corn,+bread';
  expect(api.mapIngredientsToString(ingredients)).toEqual(expectedResponse);
});

it('should return empty string if ingredients is undefined', () => {
  const expectedResponse = '';
  expect(api.mapIngredientsToString()).toEqual(expectedResponse);
})
