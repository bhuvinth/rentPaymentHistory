import InfraError from './infraError';

export default class UnableToFetchRentPayments extends InfraError {
  public static defaultErrorCode = 'CANNOT_FETCH_RENT_PAYMENT_DETAILS';
}
