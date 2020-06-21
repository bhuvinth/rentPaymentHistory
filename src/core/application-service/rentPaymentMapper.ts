import { RentPayment } from '../infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistory from '../domain/rentPaymentHistory';
import RentPaymentHistoryDTO from '../infrastructure/database/rentPaymentHistoryDTO';
import ContractId from '../domain/valueObjects/contractId';
import RentAmount from '../domain/valueObjects/rentAmount';

export default class RentPaymentHistoryMapper {
  public static fromDomainToDTO(rentPaymentDomainObj: RentPaymentHistory): RentPaymentHistoryDTO {
    const rentPaymentHistoryDtoObj = new RentPaymentHistoryDTO();
    rentPaymentHistoryDtoObj.contractId = rentPaymentDomainObj.contractId.value;
    rentPaymentHistoryDtoObj.description = rentPaymentDomainObj.description;
    rentPaymentHistoryDtoObj.isImported = rentPaymentDomainObj.isImported;
    rentPaymentHistoryDtoObj.isDeleted = rentPaymentDomainObj.isDeleted;
    rentPaymentHistoryDtoObj.paymentDate = rentPaymentDomainObj.paymentDate;
    rentPaymentHistoryDtoObj.rentAmount = rentPaymentDomainObj.rentAmount.value;
    rentPaymentHistoryDtoObj.isImported = rentPaymentDomainObj.isImported;
    rentPaymentHistoryDtoObj.created = rentPaymentDomainObj.createdDate;
    rentPaymentHistoryDtoObj.id = rentPaymentDomainObj.id;
    rentPaymentHistoryDtoObj.updated = rentPaymentDomainObj.updatedDate;

    return rentPaymentHistoryDtoObj;
  }

  public static fromDtoToDomain(rentPaymentDTObj: RentPaymentHistoryDTO): RentPaymentHistory {
    const rentPaymentHistoryObj: RentPaymentHistory = {
      contractId: ContractId.create(rentPaymentDTObj.contractId),
      createdDate: rentPaymentDTObj.created,
      description: rentPaymentDTObj.description,
      id: rentPaymentDTObj.id,
      isDeleted: rentPaymentDTObj.isDeleted,
      isImported: rentPaymentDTObj.isImported,
      paymentDate: rentPaymentDTObj.paymentDate,
      rentAmount: RentAmount.create(rentPaymentDTObj.rentAmount),
      updatedDate: rentPaymentDTObj.updated,
    };
    return rentPaymentHistoryObj;
  }

  public static fromDomainToGraphQL(rentPaymentDomainObj: RentPaymentHistory): RentPayment {
    const rentPaymentGraphQLObj: RentPayment = {
      contractId: rentPaymentDomainObj.contractId.value,
      createdAt: rentPaymentDomainObj.createdDate,
      isImported: rentPaymentDomainObj.isImported,
      description: rentPaymentDomainObj.description,
      rentId: rentPaymentDomainObj.id,
      time: rentPaymentDomainObj.paymentDate,
      updatedAt: rentPaymentDomainObj.updatedDate,
      value: rentPaymentDomainObj.rentAmount.value,
    };
    return rentPaymentGraphQLObj;
  }
}
