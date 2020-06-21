import InfraError from './infraError';

export default class UnableToDeleteRentPayments extends InfraError {
  public static defaultErrorCode = 'UNABLE_TO_DELETE_RENT_PAYMENT';
}
