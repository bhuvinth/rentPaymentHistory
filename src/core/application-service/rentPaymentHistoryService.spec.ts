import { Connection, createConnection } from 'typeorm';
import {
  RentPaymentInput,
  RentPayment,
  RentPaymentUpdateInput,
} from '../infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistoryDTO from '../infrastructure/database/rentPaymentHistoryDTO';
import RentPaymentHistoryService from './rentPaymentHistoryService';

describe('Test RentPaymentApplication Service', () => {
  let connection: Connection = null;
  let rentPaymentApplicationService!: RentPaymentHistoryService;

  beforeEach(async () => {
    if (!connection || !connection.isConnected) {
      connection = await createConnection({
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [RentPaymentHistoryDTO],
        synchronize: true,
        logging: false,
      });
      rentPaymentApplicationService = new RentPaymentHistoryService();
      return connection;
    }
    return connection;
  });

  afterEach(async () => {
    return connection.close();
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

    expect(rentPayment).toBeDefined();
    expect(rentPayment.contractId).toEqual(initialRentPayment.contractId);
    expect(rentPayment.createdAt).toEqual(initialRentPayment.createdAt);
    expect(rentPayment.description).toEqual(updateRentPaymentInput.description);
    expect(rentPayment.rentId).toEqual(updateRentPaymentInput.rentId);
    expect(rentPayment.isImported).toEqual(updateRentPaymentInput.isImported);
    expect(rentPayment.value).toEqual(updateRentPaymentInput.value);

    /* TODO: Currently Typeorm sqlite has an issue with improper precision with 'CURRENT_TIMESTAMP' being used.
             https://github.com/typeorm/typeorm/issues/2718
             Enable this test after fixing it. 
        NEEDSHELP
     */
    // expect(rentPayment.createdAt < rentPayment.updatedAt).toBeTruthy();
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
  });

  test('Should get Rent Payment History by contractId, startDate, endDate', async () => {
    const mockContractId = 100;
    const fromRentPayment = await addInitialRentPaymentAndTest(
      mockContractId,
      -1000,
      new Date('2020-01-02'),
      'Please Pay rent',
    );
    const toRentPayment = await addInitialRentPaymentAndTest(
      mockContractId,
      1000,
      new Date('2020-01-30'),
      'Rent Paid',
    );

    const mockOutOfRangeDate = new Date('2020-03-01');
    const outsideOfDateRangePayment = await addInitialRentPaymentAndTest(
      mockContractId,
      -1000,
      mockOutOfRangeDate,
      'Pay Rent',
    );
    const totalRentPayments = await rentPaymentApplicationService.getRentPaymentHistory(
      mockContractId,
      new Date('2020-01-01'),
      new Date('2020-02-01'),
    );

    expect(totalRentPayments).toBeTruthy();
    expect(totalRentPayments.sum).toBe(0);
    expect(totalRentPayments.items.length).toEqual(2);
    expect(totalRentPayments.items[1].contractId).toEqual(fromRentPayment.contractId);
    expect(totalRentPayments.items[0].contractId).toEqual(toRentPayment.contractId);
    expect(totalRentPayments.items[1].value).toEqual(fromRentPayment.value);
    expect(totalRentPayments.items[0].value).toEqual(toRentPayment.value);
    expect(totalRentPayments).not.toContain(outsideOfDateRangePayment);
    expect(totalRentPayments.items[0].time < mockOutOfRangeDate).toBe(true);
    expect(totalRentPayments.items[0].time > totalRentPayments.items[1].time).toBe(true);
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
    const getRentPayments = await rentPaymentApplicationService.getRentPaymentHistory(
      mockContractId,
      new Date('2020-01-01'),
      new Date('2020-03-01'),
    );
    expect(getRentPayments).toBeTruthy();
    expect(getRentPayments.items.length).toBe(1);
    expect(getRentPayments.items[0]).toEqual(secondRentPaymentRegcord);
  });

  test('Should delete data with Mock database with invalid Id', async () => {
    const rentPaymentPromise = rentPaymentApplicationService.deleteRentPayment(Number.MAX_VALUE);

    expect(rentPaymentPromise).rejects.toThrow();
  });
});
