/* eslint-disable no-useless-constructor */
import RentPaymentRepositoryInterface from '../infrastructure/database/rentPaymentRepositoryInterface';
import RentPaymentHistory from '../domain/rentPaymentHistory';
import RentPaymentHistoryMapper from './rentPaymentMapper';

export default class RentPaymentHistoryService {
  public constructor(private rentPaymentRepository: RentPaymentRepositoryInterface) {}

  public async addPaymentRecord(
    rentPaymentHistoryObj: RentPaymentHistory,
  ): Promise<RentPaymentHistory> {
    const rentAmountDTO = RentPaymentHistoryMapper.fromDomainToDTO(rentPaymentHistoryObj);

    const rentPaymentCreatedObj = await this.rentPaymentRepository.addRentPayment(rentAmountDTO);

    return RentPaymentHistoryMapper.fromDtoToDomain(rentPaymentCreatedObj);
  }

  public async updatePaymentRecord(
    rentPaymentHistoryObj: RentPaymentHistory,
  ): Promise<RentPaymentHistory> {
    const rentAmountDTO = RentPaymentHistoryMapper.fromDomainToDTO(rentPaymentHistoryObj);

    const rentPaymentCreatedObj = await this.rentPaymentRepository.updateRentPayment(rentAmountDTO);

    return RentPaymentHistoryMapper.fromDtoToDomain(rentPaymentCreatedObj);
  }

  // eslint-disable-next-line class-methods-use-this
  public async getRentPaymentHistory() {
    return null;
  }
}
