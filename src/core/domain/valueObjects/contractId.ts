import InvalidContractId from '../domainErrors/invalidContractId';

/* eslint-disable no-empty-function */
export default class ContractId {
  public get value() {
    return this.contractIdValue;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(private contractIdValue: number) {}

  public static create(contractId: number) {
    if (contractId <= 0) {
      throw new InvalidContractId('contractId', 'Contract Id must be greater than 0');
    }
    return new ContractId(contractId);
  }
}
