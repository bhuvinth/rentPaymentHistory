import RentPaymentHistory from '../domain/rentPaymentHistory';
import RentPaymentHistoryMapper from './rentPaymentMapper';
import { RentPaymentInput } from '../infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistoryDTO from '../infrastructure/database/rentPaymentHistoryDTO';

describe('Testing RentPaymentHistoryMapper methods', () => {
  test('test Domain to DTO map', () => {
    const mockRentPaymentInput: RentPaymentInput = {
      contractId: 1,
      isImported: true,
      time: new Date(),
      value: 1000,
      description: 'rent paid',
    };
    const rentPaymentDomainObj = RentPaymentHistory.createRentPaymentFromGraphQlInput(
      mockRentPaymentInput,
    );

    const rentPaymentDtoObj = RentPaymentHistoryMapper.fromDomainToDTO(rentPaymentDomainObj);
    expect(rentPaymentDtoObj).toBeTruthy();
    expect(rentPaymentDtoObj.contractId).toEqual(rentPaymentDomainObj.contractId.value);
    expect(rentPaymentDtoObj.description).toEqual(rentPaymentDomainObj.description);
    expect(rentPaymentDomainObj.isImported).toEqual(rentPaymentDomainObj.isImported);
    expect(rentPaymentDtoObj.rentAmount).toEqual(rentPaymentDomainObj.rentAmount.value);
    expect(rentPaymentDtoObj.paymentDate).toEqual(rentPaymentDomainObj.paymentDate);
    expect(rentPaymentDtoObj.isDeleted).toEqual(rentPaymentDomainObj.isDeleted);
  });

  test('test DTO to Domain map', () => {
    const mockRentPaymentDtoInput: RentPaymentHistoryDTO = {
      contractId: 1,
      isImported: true,
      created: new Date(),
      id: 1,
      isDeleted: false,
      paymentDate: new Date(),
      rentAmount: 1000,
      updated: new Date(),
      description: 'rent paid',
    };

    const rentPaymentDomainObj = RentPaymentHistoryMapper.fromDtoToDomain(mockRentPaymentDtoInput);
    expect(rentPaymentDomainObj).toBeTruthy();
    expect(rentPaymentDomainObj.contractId.value).toEqual(mockRentPaymentDtoInput.contractId);
    expect(rentPaymentDomainObj.createdDate).toEqual(mockRentPaymentDtoInput.created);
    expect(rentPaymentDomainObj.description).toEqual(mockRentPaymentDtoInput.description);
    expect(rentPaymentDomainObj.id).toEqual(mockRentPaymentDtoInput.id);
    expect(rentPaymentDomainObj.isImported).toEqual(mockRentPaymentDtoInput.isImported);
    expect(rentPaymentDomainObj.isDeleted).toEqual(mockRentPaymentDtoInput.isDeleted);
    expect(rentPaymentDomainObj.paymentDate).toEqual(mockRentPaymentDtoInput.paymentDate);
    expect(rentPaymentDomainObj.rentAmount.value).toEqual(mockRentPaymentDtoInput.rentAmount);
    expect(rentPaymentDomainObj.updatedDate).toEqual(mockRentPaymentDtoInput.updated);
  });

  test('Test Domain to GraphQL', () => {
    const mockRentPaymentDtoInput: RentPaymentHistoryDTO = {
      contractId: 1,
      isImported: true,
      created: new Date(),
      id: 1,
      isDeleted: false,
      paymentDate: new Date(),
      rentAmount: 1000,
      updated: new Date(),
      description: 'rent paid',
    };

    const rentPaymentDomainObj = RentPaymentHistoryMapper.fromDtoToDomain(mockRentPaymentDtoInput);
    const rentPaymentGraphQlOutput = RentPaymentHistoryMapper.fromDomainToGraphQL(
      rentPaymentDomainObj,
    );
    expect(rentPaymentGraphQlOutput.contractId).toEqual(rentPaymentDomainObj.contractId.value);
    expect(rentPaymentGraphQlOutput.createdAt).toEqual(rentPaymentDomainObj.createdDate);
    expect(rentPaymentGraphQlOutput.description).toEqual(rentPaymentDomainObj.description);
    expect(rentPaymentGraphQlOutput.isImported).toEqual(rentPaymentDomainObj.isImported);
    expect(rentPaymentGraphQlOutput.rentId).toEqual(rentPaymentDomainObj.id);
    expect(rentPaymentGraphQlOutput.time).toEqual(rentPaymentDomainObj.paymentDate);
    expect(rentPaymentGraphQlOutput.updatedAt).toEqual(rentPaymentDomainObj.updatedDate);
    expect(rentPaymentGraphQlOutput.value).toEqual(rentPaymentDomainObj.rentAmount.value);
  });
});
