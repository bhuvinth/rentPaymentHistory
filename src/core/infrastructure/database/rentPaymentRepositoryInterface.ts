import RentPaymentHistoryDTO from './rentPaymentHistoryDTO';

export default interface RentPaymentRepositoryInterface {
  addRentPayment(rentPaymentDataObj: RentPaymentHistoryDTO): Promise<RentPaymentHistoryDTO>;

  updateRentPayment(rentPaymentDataObj: RentPaymentHistoryDTO): Promise<RentPaymentHistoryDTO>;

  deleteRentPayment(rentPaymentId: number): Promise<boolean>;

  getAllRentPaymentsForContractId(
    contractId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<RentPaymentHistoryDTO[]>;

  getRentPaymentById(rentId: number): Promise<RentPaymentHistoryDTO | undefined>;
}
