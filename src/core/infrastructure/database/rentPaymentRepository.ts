import { getRepository, Repository, Between } from 'typeorm';
import Logger from '@main/utils/logger';
import RentPaymentSaveError from '@core/infrastructure/errors/rentPaymentSaveError';
import UnableToFetchRentPayments from '@core/infrastructure/errors/unableToFetchRentPaymentError';
import UnableToDeleteRentPayments from '@core/infrastructure/errors/unableToDeleteRentPayment';
import RentPaymentHistoryEntity from './rentPaymentHistoryEntity';
import RentPaymentRepositoryInterface from './rentPaymentRepositoryInterface';

export default class RentPaymentRepository implements RentPaymentRepositoryInterface {
  private repository: Repository<RentPaymentHistoryEntity>;

  constructor() {
    this.repository = getRepository(RentPaymentHistoryEntity);
  }

  public async addRentPayment(
    rentPaymentDataObj: RentPaymentHistoryEntity,
  ): Promise<RentPaymentHistoryEntity> {
    try {
      const savedRentPayment = await this.repository.save(rentPaymentDataObj);
      return savedRentPayment;
    } catch (error) {
      Logger.error(error);
      throw new RentPaymentSaveError(error);
    }
  }

  public async updateRentPayment(
    rentPaymentDataObj: RentPaymentHistoryEntity,
  ): Promise<RentPaymentHistoryEntity> {
    try {
      const findData = await this.repository.findOneOrFail({
        id: rentPaymentDataObj.id,
        isDeleted: false,
      });
      findData.description = rentPaymentDataObj.description;
      findData.paymentDate = rentPaymentDataObj.paymentDate;
      findData.rentAmount = rentPaymentDataObj.rentAmount;
      findData.isImported = rentPaymentDataObj.isImported;
      const savedData = await this.repository.save(findData);
      return savedData;
    } catch (error) {
      Logger.error(error);
      throw new RentPaymentSaveError(error);
    }
  }

  public async deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    try {
      const foundResult = await this.repository.findOneOrFail(rentPaymentId);
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
  ): Promise<RentPaymentHistoryEntity[]> {
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

  public async getRentPaymentById(rentId: number): Promise<RentPaymentHistoryEntity | undefined> {
    return this.repository.findOne(rentId);
  }
}
