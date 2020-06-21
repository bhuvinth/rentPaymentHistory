import { getRepository, Repository, Between } from 'typeorm';
import Logger from '@main/utils/logger';
import RentPaymentSaveError from '@core/infrastructure/errors/rentPaymentSaveError';
import UnableToFetchRentPayments from '@core/infrastructure/errors/unableToFetchRentPaymentError';
import UnableToDeleteRentPayments from '@core/infrastructure/errors/unableToDeleteRentPayment';
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
      Logger.error(error);
      throw new RentPaymentSaveError(error);
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
      Logger.error(error);
      throw new RentPaymentSaveError(error);
    }
  }

  public async deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    try {
      const foundResult = await this.repository.findOneOrFail(rentPaymentId);
      console.log(foundResult);
      const findAllResult = await this.repository.find();
      console.log(findAllResult);
      foundResult.isDeleted = true;
      await this.repository.update(rentPaymentId, foundResult);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new UnableToDeleteRentPayments(error);
    }
  }

  public async getAllRentPaymentsForContractId(
    contractId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<RentPaymentHistoryDTO[]> {
    try {
      return await this.repository.find({
        where: {
          contractId,
          paymentDate: Between(startDate.toISOString(), endDate.toISOString()),
          isDeleted: false,
        },
        order: { paymentDate: 'DESC' },
      });
    } catch (error) {
      Logger.error(error);
      throw new UnableToFetchRentPayments(error);
    }
  }

  public async getRentPaymentById(rentId: number): Promise<RentPaymentHistoryDTO | undefined> {
    return this.repository.findOne(rentId);
  }
}
