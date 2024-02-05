import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'concat', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should $case', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
