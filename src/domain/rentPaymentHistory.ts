/* eslint-disable no-empty-function */

import ContractId from './valueObjects/contractId';
import RentAmount from './valueObjects/rentAmount';

export default class RentPaymentHistory {
  public id!: number;

  // eslint-disable-next-line no-useless-constructor
  private constructor(
    public contractId: ContractId,

    public description: string,

    public rentAmount: RentAmount,

    public paymentDate: Date,

    public isImported: boolean,

    public createdDate: Date,

    public updatedDate: Date,
    public isDeleted: boolean = false, // eslint-disable-next-line no-empty-function
  ) {}

  public static fromRentPaymentHistoryType(rentPaymentObject: any): RentPaymentHistory {
    const contractId = ContractId.create(rentPaymentObject.contractId);
    const rentAmount = RentAmount.create(rentPaymentObject.rentAmount);
    return new RentPaymentHistory(
      contractId,
      rentPaymentObject.description,
      rentAmount,
      rentPaymentObject.paymentDate,
      rentPaymentObject.isImported,
      rentPaymentObject.createdDate,
      rentPaymentObject.updatedDate,
      rentPaymentObject.isDeleted,
    );
  }
}
