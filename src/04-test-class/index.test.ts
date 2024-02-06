import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // комментарий, вставленный в середину истории
    const bankAccount = getBankAccount(10);

    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(10);
    const withdrawFn = () => bankAccount.withdraw(20);

    expect(withdrawFn).toThrow(InsufficientFundsError);
    expect(withdrawFn).toThrow(
      'Insufficient funds: cannot withdraw more than 10',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(10);
    const otherBankAccount = getBankAccount(30);
    const transferFn = () => bankAccount.transfer(20, otherBankAccount);

    expect(transferFn).toThrow(InsufficientFundsError);
    expect(transferFn).toThrow(
      'Insufficient funds: cannot withdraw more than 10',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(10);
    const transferFn = () => bankAccount.transfer(20, bankAccount);

    expect(transferFn).toThrow(TransferFailedError);
    expect(transferFn).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);

    bankAccount.deposit(20);

    expect(bankAccount.getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);

    bankAccount.withdraw(5);

    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(20);
    const otherBankAccount = getBankAccount(30);

    bankAccount.transfer(10, otherBankAccount);

    expect(bankAccount.getBalance()).toBe(10);
    expect(otherBankAccount.getBalance()).toBe(40);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(15).mockReturnValueOnce(1);
    const bankAccount = getBankAccount(10);

    const balance = await bankAccount.fetchBalance();

    expect(balance).toBe(15);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(15).mockReturnValueOnce(1);
    const bankAccount = getBankAccount(10);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(15);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(15).mockReturnValueOnce(0);
    const bankAccount = getBankAccount(10);

    try {
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
      expect((e as Error).message).toBe('Synchronization failed');
    }
  });
});
