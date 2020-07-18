import { capitaliseFirstLetter } from '../utils';

describe('Capitalise', () => {
  it('should capitalise the first letter of the given word', () => {
    expect(capitaliseFirstLetter('capsicum')).toEqual('Capsicum');
  });
});
