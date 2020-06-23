import {
  RentPaymentInput,
  RentPayment,
  RentPaymentUpdateInput,
} from '../infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistoryService from './rentPaymentHistoryService';
import MockRepositoryImplementation from './mockRepository/mockRentPaymentRepository';

describe('Test RentPaymentApplication Service', () => {
  let rentPaymentApplicationService!: RentPaymentHistoryService;
  let addMock!: any;
  let updateMock!: any;
  let deleteMock: any;
  let getAllRentPaymentsForContractId: any;
  let getRentPaymentById!: any;
  beforeEach(async () => {
    const mockRepositoryObj = new MockRepositoryImplementation();
    addMock = jest.spyOn(mockRepositoryObj, 'addRentPayment');
    updateMock = jest.spyOn(mockRepositoryObj, 'updateRentPayment');
    deleteMock = jest.spyOn(mockRepositoryObj, 'deleteRentPayment');
    getAllRentPaymentsForContractId = jest.spyOn(
      mockRepositoryObj,
      'getAllRentPaymentsForContractId',
    );
    getRentPaymentById = jest.spyOn(mockRepositoryObj, 'getRentPaymentById');

    rentPaymentApplicationService = new RentPaymentHistoryService(mockRepositoryObj);
  });

  async function addInitialRentPaymentAndTest(
    contractId: number = 1,
    payment: number = 1000,
    paymentDate: Date = new Date(),
    description: string = 'Rent Paid',
  ): Promise<RentPayment> {
    const mockRentPaymentInput: RentPaymentInput = {
      contractId,
      isImported: true,
      time: paymentDate,
      value: payment,
      description,
    };
    const rentPaymentGraphQlObj = await rentPaymentApplicationService.addPaymentRecord(
      mockRentPaymentInput,
    );
    expect(rentPaymentGraphQlObj).toBeTruthy();
    expect(rentPaymentGraphQlObj.contractId).toEqual(mockRentPaymentInput.contractId);
    expect(rentPaymentGraphQlObj.description).toEqual(mockRentPaymentInput.description);
    expect(rentPaymentGraphQlObj.isImported).toEqual(mockRentPaymentInput.isImported);
    expect(rentPaymentGraphQlObj.time).toEqual(mockRentPaymentInput.time);
    expect(rentPaymentGraphQlObj.value).toEqual(mockRentPaymentInput.value);
    expect(rentPaymentGraphQlObj.rentId).toBeDefined();
    expect(rentPaymentGraphQlObj.createdAt).toBeDefined();
    expect(rentPaymentGraphQlObj.updatedAt).toBeDefined();
    return rentPaymentGraphQlObj;
  }

  test('Should addRentPayment with Mock database', async () => {
    await addInitialRentPaymentAndTest();
    expect(addMock).toHaveBeenCalledTimes(1);
  });

  test('Should updateRentPayment with Mock database with valid Id', async () => {
    const initialRentPayment = await addInitialRentPaymentAndTest();
    const updateRentPaymentInput: RentPaymentUpdateInput = {
      isImported: !initialRentPayment.isImported,
      rentId: initialRentPayment.rentId,
      value: initialRentPayment.value + 100,
      description: 'Adding Additional charges due to utility bills',
    };
    const rentPayment = await rentPaymentApplicationService.updatePaymentRecord(
      updateRentPaymentInput,
    );

    expect(addMock).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(getRentPaymentById).toHaveBeenCalledTimes(1);

    expect(rentPayment).toBeDefined();
    expect(rentPayment.contractId).toEqual(initialRentPayment.contractId);
    expect(rentPayment.createdAt).toEqual(initialRentPayment.createdAt);
    expect(rentPayment.description).toEqual(updateRentPaymentInput.description);
    expect(rentPayment.rentId).toEqual(updateRentPaymentInput.rentId);
    expect(rentPayment.isImported).toEqual(updateRentPaymentInput.isImported);
    expect(rentPayment.value).toEqual(updateRentPaymentInput.value);
    expect(rentPayment.createdAt < rentPayment.updatedAt).toBeTruthy();
  });

  test('Should not updateRentPayment with Mock database with invalid Id', async () => {
    const initialRentPayment = await addInitialRentPaymentAndTest();
    const updateRentPaymentInput: RentPaymentUpdateInput = {
      isImported: !initialRentPayment.isImported,
      rentId: initialRentPayment.rentId + 100,
      value: initialRentPayment.value + 100,
      description: 'Adding Additional charges due to utility bills',
    };
    const rentPaymentPromise = rentPaymentApplicationService.updatePaymentRecord(
      updateRentPaymentInput,
    );

    expect(rentPaymentPromise).rejects.toThrow();

    expect(getRentPaymentById).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledTimes(0);
  });

  test('Should get Rent Payment History by contractId, startDate, endDate', async () => {
    const mockContractId = 100;
    await addInitialRentPaymentAndTest(
      mockContractId,
      -1000,
      new Date('2020-01-02'),
      'Please Pay rent',
    );
    await addInitialRentPaymentAndTest(mockContractId, 1000, new Date('2020-01-30'), 'Rent Paid');
    const mockOutOfRangeDate = new Date('2020-03-01');
    await addInitialRentPaymentAndTest(mockContractId, -1000, mockOutOfRangeDate, 'Pay Rent');

    const totalRentPayments = await rentPaymentApplicationService.getRentPaymentHistory(
      mockContractId,
      new Date('2020-01-01'),
      new Date('2020-02-01'),
    );

    expect(getAllRentPaymentsForContractId).toHaveBeenCalledTimes(1);
    expect(addMock).toHaveBeenCalledTimes(3);

    expect(totalRentPayments).toBeTruthy();
    expect(totalRentPayments.sum).toBe(0);
    expect(totalRentPayments.items.length).toEqual(2);
  });

  test('Should delete data with Mock database with valid Id', async () => {
    const mockContractId = 100;

    const initialRentPayment = await addInitialRentPaymentAndTest(
      mockContractId,
      -1000,
      new Date('2020-01-02'),
      'Pay Rent',
    );
    const secondRentPaymentRegcord = await addInitialRentPaymentAndTest(
      mockContractId,
      1000,
      new Date('2020-01-02'),
      'Rent paid',
    );
    const deleteRentPaymentResponse = await rentPaymentApplicationService.deleteRentPayment(
      initialRentPayment.rentId,
    );

    expect(deleteRentPaymentResponse).toBe(true);
    expect(addMock).toHaveBeenCalledTimes(2);
    expect(deleteMock).toHaveBeenCalledTimes(1);
    const getRentPayments = await rentPaymentApplicationService.getRentPaymentHistory(
      mockContractId,
      new Date('2020-01-01'),
      new Date('2020-03-01'),
    );

    expect(deleteMock);
    expect(getRentPayments).toBeTruthy();
    expect(getRentPayments.items.length).toBe(1);
    expect(getRentPayments.items[0]).toEqual(secondRentPaymentRegcord);
  });

  test('Should delete data with Mock database with invalid Id', async () => {
    const rentPaymentPromise = rentPaymentApplicationService.deleteRentPayment(Number.MAX_VALUE);

    expect(rentPaymentPromise).rejects.toThrow();
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
