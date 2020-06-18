import { getRepository, Repository } from 'typeorm';
import RentPaymentData from './rentPayment';

export default class RentPaymentRepository {
  private repository: Repository<RentPaymentData>;

  constructor() {
    this.repository = getRepository(RentPaymentData);
  }

  public async addRentPayment(rentPaymentDataObj: RentPaymentData): Promise<RentPaymentData> {
    try {
      const savedRentPayment = await this.repository.save(rentPaymentDataObj);
      return savedRentPayment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateRentPayment(rentPaymentDataObj: RentPaymentData): Promise<RentPaymentData> {
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
      console.log(error);
      throw error;
    }
  }
}
