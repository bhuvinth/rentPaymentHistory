import ContractId from './contractId';
import InvalidContractId from '../domainErrors/invalidContractId';

describe('Test Contract ID creation', () => {
  test('Test contractID with valid value created successfully', () => {
    const mockValue = 1;
    const contract = ContractId.create(mockValue);
    expect(contract).toBeTruthy();
    expect(contract.value).toEqual(mockValue);
  });

  test('Should throw Error for invalid(less than or 0) Contract Id', () => {
    const mockValue = -1;
    expect(() => ContractId.create(mockValue)).toThrow(InvalidContractId);
  });
});
