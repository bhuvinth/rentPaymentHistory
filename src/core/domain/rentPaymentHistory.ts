import { RentPaymentInput, RentPaymentUpdateInput } from '../infrastructure/graphQL/schemaAndTypes';
import ContractId from './valueObjects/contractId';
import RentAmount from './valueObjects/rentAmount';

export default class RentPaymentHistory {
  public id!: number;

  public createdDate!: Date;

  public updatedDate!: Date;

  public contractId: ContractId;

  public description: string;

  public rentAmount: RentAmount;

  public paymentDate: Date;

  public isImported: boolean;

  public isDeleted: boolean = false;

  // eslint-disable-next-line no-useless-constructor
  private constructor() // eslint-disable-next-line no-empty-function
  {}

  public static createRentPaymentFromGraphQlInput(
    graphQlInputObj: RentPaymentInput,
  ): RentPaymentHistory {
    const contractId = ContractId.create(graphQlInputObj.contractId);
    const rentAmount = RentAmount.create(graphQlInputObj.value);

    const rentPaymentHistoryObj = new RentPaymentHistory();
    rentPaymentHistoryObj.contractId = contractId;
    rentPaymentHistoryObj.description = graphQlInputObj.description || '';
    rentPaymentHistoryObj.isImported = graphQlInputObj.isImported;
    rentPaymentHistoryObj.paymentDate = graphQlInputObj.time;
    rentPaymentHistoryObj.rentAmount = rentAmount;
    rentPaymentHistoryObj.createdDate = new Date();
    rentPaymentHistoryObj.isDeleted = false;
    return rentPaymentHistoryObj;
  }

  public static updateRentPaymentFromGraphQlInput(
    existingRentPayment: RentPaymentHistory,
    rentUpdateInputObj: RentPaymentUpdateInput,
  ): RentPaymentHistory {
    const rentPaymentHistoryObj = new RentPaymentHistory();
    rentPaymentHistoryObj.contractId = existingRentPayment.contractId;
    rentPaymentHistoryObj.createdDate = existingRentPayment.createdDate;
    rentPaymentHistoryObj.description =
      rentUpdateInputObj.description || existingRentPayment.description;
    rentPaymentHistoryObj.id = existingRentPayment.id;

    rentPaymentHistoryObj.paymentDate = rentUpdateInputObj.time || existingRentPayment.paymentDate;
    rentPaymentHistoryObj.isDeleted = existingRentPayment.isDeleted;
    rentPaymentHistoryObj.isImported = rentUpdateInputObj.isImported;
    rentPaymentHistoryObj.rentAmount = RentAmount.create(rentUpdateInputObj.value);
    return rentPaymentHistoryObj;
  }
}
