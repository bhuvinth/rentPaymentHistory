/* eslint-disable no-empty-function */
import InvalidRentPaymentAmount from '../domainErrors/invalidRentPaymentAmount';

export default class RentAmount {
  public get value() {
    return this.rentAmountValue;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(private rentAmountValue: number) {}

  public static create(rentAmount: number) {
    if (rentAmount === 0) {
      throw new InvalidRentPaymentAmount('rentAmount', 'Rent Amount cannot be 0');
    }
    return new RentAmount(rentAmount);
  }
}
