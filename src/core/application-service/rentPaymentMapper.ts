import { RentPayment } from '@core/infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistory from '@core/domain/rentPaymentHistory';
import RentPaymentHistoryEntity from '@main/core/infrastructure/database/rentPaymentHistoryEntity';
import ContractId from '@core/domain/valueObjects/contractId';
import RentAmount from '@core/domain/valueObjects/rentAmount';

export default class RentPaymentHistoryMapper {
  public static fromDomainToEntity(
    rentPaymentDomainObj: RentPaymentHistory,
  ): RentPaymentHistoryEntity {
    const rentPaymentHistoryEntityObj = new RentPaymentHistoryEntity();
    rentPaymentHistoryEntityObj.contractId = rentPaymentDomainObj.contractId.value;
    rentPaymentHistoryEntityObj.description = rentPaymentDomainObj.description;
    rentPaymentHistoryEntityObj.isImported = rentPaymentDomainObj.isImported;
    rentPaymentHistoryEntityObj.isDeleted = rentPaymentDomainObj.isDeleted;
    rentPaymentHistoryEntityObj.paymentDate = rentPaymentDomainObj.paymentDate;
    rentPaymentHistoryEntityObj.rentAmount = rentPaymentDomainObj.rentAmount.value;
    rentPaymentHistoryEntityObj.isImported = rentPaymentDomainObj.isImported;
    rentPaymentHistoryEntityObj.createdAt = rentPaymentDomainObj.createdDate;
    rentPaymentHistoryEntityObj.id = rentPaymentDomainObj.id;
    rentPaymentHistoryEntityObj.updatedAt = rentPaymentDomainObj.updatedDate;

    return rentPaymentHistoryEntityObj;
  }

  public static fromEntityToDomain(rentPaymentDTObj: RentPaymentHistoryEntity): RentPaymentHistory {
    const rentPaymentHistoryObj: RentPaymentHistory = {
      contractId: ContractId.create(rentPaymentDTObj.contractId),
      createdDate: rentPaymentDTObj.createdAt,
      description: rentPaymentDTObj.description,
      id: rentPaymentDTObj.id,
      isDeleted: rentPaymentDTObj.isDeleted,
      isImported: rentPaymentDTObj.isImported,
      paymentDate: rentPaymentDTObj.paymentDate,
      rentAmount: RentAmount.create(rentPaymentDTObj.rentAmount),
      updatedDate: rentPaymentDTObj.updatedAt,
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
      isDeleted: rentPaymentDomainObj.isDeleted,
    };
    return rentPaymentGraphQLObj;
  }
}
