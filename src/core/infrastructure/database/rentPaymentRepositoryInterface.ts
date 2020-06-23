import RentPaymentHistoryEntity from './rentPaymentHistoryEntity';

export default interface RentPaymentRepositoryInterface {
  addRentPayment(rentPaymentDataObj: RentPaymentHistoryEntity): Promise<RentPaymentHistoryEntity>;

  updateRentPayment(
    rentPaymentDataObj: RentPaymentHistoryEntity,
  ): Promise<RentPaymentHistoryEntity>;

  deleteRentPayment(rentPaymentId: number): Promise<boolean>;

  getAllRentPaymentsForContractId(
    contractId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<RentPaymentHistoryEntity[]>;

  getRentPaymentById(rentId: number): Promise<RentPaymentHistoryEntity | undefined>;
}
