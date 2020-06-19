import DomainError from './domainErrorBase';

export default class InvalidRentPaymentAmount extends DomainError {
  public static defaultErrorCode = 'INVALID_RENT_PAYMENT_AMOUNT';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
