import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnThis();
    (axios.get as jest.Mock).mockReturnValue({ data: 'Hello Jest' });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('some/path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('some/path');

    expect(axios.get).toHaveBeenCalledWith('some/path');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('some/path');

    expect(result).toEqual('Hello Jest');
  });
});
