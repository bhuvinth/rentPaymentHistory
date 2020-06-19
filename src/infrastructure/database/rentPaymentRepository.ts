import { getRepository, Repository } from 'typeorm';
import RentPaymentHistoryDTO from './rentPaymentHistoryDTO';
import RentPaymentRepositoryInterface from './rentPaymentRepositoryInterface';

export default class RentPaymentRepository implements RentPaymentRepositoryInterface {
  private repository: Repository<RentPaymentHistoryDTO>;

  constructor() {
    this.repository = getRepository(RentPaymentHistoryDTO);
  }

  public async addRentPayment(
    rentPaymentDataObj: RentPaymentHistoryDTO,
  ): Promise<RentPaymentHistoryDTO> {
    try {
      const savedRentPayment = await this.repository.save(rentPaymentDataObj);
      return savedRentPayment;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  public async updateRentPayment(
    rentPaymentDataObj: RentPaymentHistoryDTO,
  ): Promise<RentPaymentHistoryDTO> {
    try {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({
          description: rentPaymentDataObj.description,
          paymentDate: rentPaymentDataObj.paymentDate,
          rentAmount: rentPaymentDataObj.rentAmount,
          isImported: rentPaymentDataObj.isImported,
        })
        .where('id = :id', { id: rentPaymentDataObj.id })
        .execute();

      const updatedData = await this.repository.findOneOrFail(rentPaymentDataObj.id);
      return updatedData;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  public async deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    try {
      const foundResult = await this.repository.findOneOrFail(rentPaymentId);
      foundResult.isDeleted = true;
      await this.repository.update(rentPaymentId, foundResult);
      return true;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  public async getAllRentPaymentsForContractId(
    contractId: number,
  ): Promise<RentPaymentHistoryDTO[]> {
    try {
      return await this.repository.find({ where: { contractId } });
    } catch (error) {
      throw error;
    }
  }
}
