import DomainError from './domainErrorBase';

export default class InvalidContractId extends DomainError {
  public static defaultErrorCode = 'INVALID_CONTRACT_ID';

  constructor(field: string, reason: string) {
    super({ message: reason, details: { field, reason } });
  }
}
