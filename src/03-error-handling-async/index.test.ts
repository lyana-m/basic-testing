import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('hello')).toBe('hello');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('something went wrong')).toThrow(
      'something went wrong',
    );
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
    expect(rejectCustomError).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
