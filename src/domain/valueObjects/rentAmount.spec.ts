import RentAmount from './rentAmount';
import InvalidRentPaymentAmount from '../domainErrors/invalidRentPaymentAmount';

describe('Test Rent Payment Amount creation', () => {
  test('Should create RentPaymentAmount succesfully for valid non zero value', () => {
    const mockValue = 1;
    const contract = RentAmount.create(mockValue);
    expect(contract).toBeTruthy();
    expect(contract.value).toEqual(mockValue);
  });

  test('Should throw Error for zero value Rent payment amount', () => {
    const mockValue = 0;
    expect(() => RentAmount.create(mockValue)).toThrow(InvalidRentPaymentAmount);
  });
});
