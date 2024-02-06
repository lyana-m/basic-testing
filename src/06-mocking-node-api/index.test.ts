import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByTimeout(cb, 200);

    expect(setTimeout).toHaveBeenCalledWith(cb, 200);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByTimeout(cb, 200);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    doStuffByInterval(cb, 200);

    expect(setInterval).toHaveBeenCalledWith(cb, 200);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByInterval(cb, 200);

    expect(cb).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('path/to/file');

    expect(join).toHaveBeenCalledWith(__dirname, 'path/to/file');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously('path/to/file');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('file content'));
    const result = await readFileAsynchronously('path/to/file');

    expect(result).toBe('file content');
  });
});
