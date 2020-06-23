import { createConnection, Connection } from 'typeorm';
import RentPaymentRepository from './rentPaymentRepository';
import RentPaymentHistoryEntity from './rentPaymentHistoryEntity';

describe('Test Rent Payment Repository for Different methods', () => {
  let connection: Connection = null;
  beforeEach(async () => {
    if (!connection || !connection.isConnected) {
      connection = await createConnection({
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [RentPaymentHistoryEntity],
        synchronize: true,
        logging: false,
      });
      return connection;
    }
    return connection;
  });

  afterEach(async () => {
    return connection.close();
  });

  async function addInitialRecordAndTest(
    contractId = 1,
    rentAmount = 500,
    paymentDate = new Date(),
  ): Promise<RentPaymentHistoryEntity> {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();
    mockData.contractId = contractId;
    mockData.description = 'description';
    mockData.paymentDate = paymentDate;
    mockData.rentAmount = rentAmount;
    mockData.isImported = false;

    const savedRentPaymentData = await rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentData).toBeTruthy();
    expect(savedRentPaymentData.id).toBeGreaterThan(0);
    expect(savedRentPaymentData.contractId).toEqual(mockData.contractId);
    expect(savedRentPaymentData.createdAt).toBeDefined();
    expect(savedRentPaymentData.description).toEqual(mockData.description);
    expect(savedRentPaymentData.isImported).toEqual(mockData.isImported);
    expect(savedRentPaymentData.rentAmount).toEqual(mockData.rentAmount);
    expect(savedRentPaymentData.paymentDate).toEqual(mockData.paymentDate);
    return savedRentPaymentData;
  }

  test('Should Insert successfully, Add RentPaymentData positive test case', async () => {
    const savedRentPaymentData = await addInitialRecordAndTest();
    expect(savedRentPaymentData).toBeTruthy();
  });

  test('Should fail insert, Try saving the RentPaymentData without passing contract Id', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();

    mockData.description = 'description';
    mockData.paymentDate = new Date();
    mockData.rentAmount = 500;
    mockData.isImported = false;
    mockData.contractId = null;

    const savedRentPaymentDataPromise = rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentDataPromise).rejects.toThrow();
  });

  test('Should fail insert, Try saving the RentPaymentData without passing description', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();

    mockData.description = null;
    mockData.paymentDate = new Date();
    mockData.rentAmount = 500;
    mockData.isImported = false;
    mockData.contractId = 1;

    const savedRentPaymentDataPromise = rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentDataPromise).rejects.toThrow();
  });

  test('Should fail insert, Try saving the RentPaymentData without passing paymentDate', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();

    mockData.description = 'description';
    mockData.paymentDate = null;
    mockData.rentAmount = 500;
    mockData.isImported = false;
    mockData.contractId = 1;

    const savedRentPaymentDataPromise = rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentDataPromise).rejects.toThrow();
  });

  test('Should fail insert, Try saving the RentPaymentData without passing rentAmount', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();

    mockData.description = 'description';
    mockData.paymentDate = new Date();
    mockData.rentAmount = null;
    mockData.isImported = false;
    mockData.contractId = 1;

    const savedRentPaymentDataPromise = rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentDataPromise).rejects.toThrow();
  });

  test('Should fail insert, Try saving the RentPaymentData without passing isImported', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentHistoryEntity();

    mockData.description = 'description';
    mockData.paymentDate = new Date();
    mockData.rentAmount = null;
    mockData.isImported = null;
    mockData.contractId = 1;

    const savedRentPaymentDataPromise = rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentDataPromise).rejects.toThrow();
  });

  test('Should update RentPaymentData will all valid values', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const savedRentPaymentData = await addInitialRecordAndTest();
    savedRentPaymentData.description = 'update test';
    savedRentPaymentData.rentAmount = -500;

    const updatedData = await rentPaymentRepository.updateRentPayment(savedRentPaymentData);
    expect(updatedData).toBeTruthy();
    expect(updatedData.rentAmount).toEqual(savedRentPaymentData.rentAmount);
    expect(updatedData.description).toEqual(savedRentPaymentData.description);
  });

  test('Update RentPaymentData with setting rentAmount to null, should fail the update', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const savedRentPaymentData = await addInitialRecordAndTest();

    savedRentPaymentData.rentAmount = null;
    const updatedDataPromise = rentPaymentRepository.updateRentPayment(savedRentPaymentData);

    expect(updatedDataPromise).rejects.toThrow();
  });

  test('Update RentPaymentData with setting payment date to null, should fail the update', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const savedRentPaymentData = await addInitialRecordAndTest();

    savedRentPaymentData.paymentDate = null;
    const updatedDataPromise = rentPaymentRepository.updateRentPayment(savedRentPaymentData);

    expect(updatedDataPromise).rejects.toThrow();
  });

  test('Update RentPayment should not update ContractID', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const savedRentPaymentData = await addInitialRecordAndTest();
    const initialContractId = savedRentPaymentData.contractId;
    savedRentPaymentData.contractId = 100;
    const updatedRentPaymentData = await rentPaymentRepository.updateRentPayment(
      savedRentPaymentData,
    );

    expect(updatedRentPaymentData.contractId).not.toEqual(savedRentPaymentData.contractId);
    expect(updatedRentPaymentData.contractId).toEqual(initialContractId);
  });

  test('Delete RentPayment by passing valid rentPaymentId, should delete succesfully', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const savedRentPaymentData = await addInitialRecordAndTest();
    const deleteRentPaymentPromise = rentPaymentRepository.deleteRentPayment(
      savedRentPaymentData.id,
    );
    expect(deleteRentPaymentPromise).resolves.toBeTruthy();
  });

  test('Delete RentPayment by passing invalid rentPaymentId, should fail the delete', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const deleteRentPaymentPromise = rentPaymentRepository.deleteRentPayment(Number.MAX_VALUE);
    await expect(deleteRentPaymentPromise).rejects.toThrow();
  });

  test('Get RentPayment by passing valid contractId, should get all the relevant rent payments', async () => {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockContractId = 100;
    const mockStartDate = new Date('2020-01-01');
    const mockEndDate = new Date('2020-01-10');
    const mockOutOfRangeDate = new Date('2020-02-01');
    const savedRentPaymentDataRecord1 = await addInitialRecordAndTest(
      mockContractId,
      1000,
      mockStartDate,
    );
    const savedRentPaymentDataRecord2 = await addInitialRecordAndTest(
      mockContractId,
      -1000,
      mockEndDate,
    );
    const savedRentPaymentDataRecordOutOfRange = await addInitialRecordAndTest(
      mockContractId,
      1000,
      mockOutOfRangeDate,
    );

    const recordsForContractId = await rentPaymentRepository.getAllRentPaymentsForContractId(
      mockContractId,
      new Date('2019-12-31'),
      new Date('2020-01-11'),
    );

    expect(recordsForContractId).toBeTruthy();
    expect(recordsForContractId.length).toEqual(2);
    expect(recordsForContractId[1].contractId).toEqual(savedRentPaymentDataRecord1.contractId);
    expect(recordsForContractId[0].contractId).toEqual(savedRentPaymentDataRecord2.contractId);
    expect(recordsForContractId[1].rentAmount).toEqual(savedRentPaymentDataRecord1.rentAmount);
    expect(recordsForContractId[0].rentAmount).toEqual(savedRentPaymentDataRecord2.rentAmount);
    expect(recordsForContractId).not.toContain(savedRentPaymentDataRecordOutOfRange);
    expect(recordsForContractId[0].paymentDate < mockOutOfRangeDate).toBe(true);
    expect(recordsForContractId[0].paymentDate > recordsForContractId[1].paymentDate).toBe(true);
  });
});
