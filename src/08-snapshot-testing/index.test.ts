import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    // commit added with interactive rebase
    const linkedList = generateLinkedList(['1st node', '2nd node', '3rd node']);
    expect(linkedList).toStrictEqual({
      value: '1st node',
      next: {
        value: '2nd node',
        next: {
          value: '3rd node',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(['1st node', '2nd node', '3rd node']);
    expect(linkedList).toMatchSnapshot();
  });
});
