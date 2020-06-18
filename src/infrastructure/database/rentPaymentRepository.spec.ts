import { createConnection, Connection } from 'typeorm';
import RentPaymentRepository from './rentPaymentRepository';
import RentPaymentData from './rentPayment';

describe('Test Rent Payment Repository for Different methods', () => {
  let connection: Connection = null;
  beforeEach(async () => {
    if (!connection || !connection.isConnected) {
      connection = await createConnection({
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [RentPaymentData],
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

  async function addInitialRecordAndTest(): Promise<RentPaymentData> {
    const rentPaymentRepository = new RentPaymentRepository();
    const mockData = new RentPaymentData();
    mockData.contractId = 1;
    mockData.description = 'description';
    mockData.paymentDate = new Date();
    mockData.rentAmount = 500;
    mockData.isImported = false;

    const savedRentPaymentData = await rentPaymentRepository.addRentPayment(mockData);

    expect(savedRentPaymentData).toBeTruthy();
    expect(savedRentPaymentData.id).toBeGreaterThan(0);
    expect(savedRentPaymentData.contractId).toEqual(mockData.contractId);
    expect(savedRentPaymentData.created).toBeDefined();
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
    const mockData = new RentPaymentData();

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
    const mockData = new RentPaymentData();

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
    const mockData = new RentPaymentData();

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
    const mockData = new RentPaymentData();

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
    const mockData = new RentPaymentData();

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
});
