import InfraError from './infraError';

export default class RentPaymentSaveError extends InfraError {
  public static defaultErrorCode = 'UNABLE_TO_SAVE_RENT_PAYMENT';
}
