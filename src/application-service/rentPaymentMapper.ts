import RentPaymentHistory from '../domain/rentPaymentHistory';
import RentPaymentHistoryDTO from '../infrastructure/database/rentPaymentHistoryDTO';
import ContractId from '../domain/valueObjects/contractId';
import RentAmount from '../domain/valueObjects/rentAmount';

export default class RentPaymentHistoryMapper {
  public static fromDomainToDTO(rentPaymentHistoryObj: RentPaymentHistory): RentPaymentHistoryDTO {
    const rentPaymentHistoryDtoObj = new RentPaymentHistoryDTO();
    rentPaymentHistoryDtoObj.contractId = rentPaymentHistoryObj.contractId.value;
    rentPaymentHistoryDtoObj.description = rentPaymentHistoryObj.description;
    rentPaymentHistoryDtoObj.isImported = rentPaymentHistoryDtoObj.isImported;
    rentPaymentHistoryDtoObj.paymentDate = rentPaymentHistoryObj.paymentDate;
    rentPaymentHistoryDtoObj.rentAmount = rentPaymentHistoryObj.rentAmount.value;
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
}
