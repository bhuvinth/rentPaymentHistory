/* eslint-disable no-useless-constructor */
import { IApplicationError } from '@main/common/applicationError';
import RentPaymentHistoryEntity from '../infrastructure/database/rentPaymentHistoryEntity';
import {
  RentPaymentInput,
  RentPaymentUpdateInput,
  TotalRentPayment,
  RentPayment,
} from '../infrastructure/graphQL/schemaAndTypes';
import RentPaymentRepositoryInterface from '../infrastructure/database/rentPaymentRepositoryInterface';
import RentPaymentHistory from '../domain/rentPaymentHistory';
import RentPaymentHistoryMapper from './rentPaymentMapper';
import RentPaymentRepository from '../infrastructure/database/rentPaymentRepository';
import DomainError from '../domain/domainErrors/domainErrorBase';

export default class RentPaymentHistoryService {
  public constructor(
    private rentPaymentRepository: RentPaymentRepositoryInterface = new RentPaymentRepository(), // eslint-disable-next-line no-empty-function
  ) {}

  public async addPaymentRecord(rentPaymentInputObj: RentPaymentInput): Promise<RentPayment> {
    const rentAmountDomainObj = RentPaymentHistory.createRentPaymentFromGraphQlInput(
      rentPaymentInputObj,
    );
    const rentAmountEntity = RentPaymentHistoryMapper.fromDomainToEntity(rentAmountDomainObj);

    const rentPaymentCreatedObj = await this.rentPaymentRepository.addRentPayment(rentAmountEntity);

    return RentPaymentHistoryMapper.fromDomainToGraphQL(
      RentPaymentHistoryMapper.fromEntityToDomain(rentPaymentCreatedObj),
    );
  }

  public async updatePaymentRecord(
    rentPaymenGraphQlInput: RentPaymentUpdateInput,
  ): Promise<RentPayment> {
    const existingRentPayment = await this.rentPaymentRepository.getRentPaymentById(
      rentPaymenGraphQlInput.rentId,
    );

    if (!existingRentPayment) {
      const applicationErrorObj: IApplicationError = {
        code: 'INVALID_RENT_ID',
        message: 'Invalid Rent Id passed. Cannot update',
      };
      throw new DomainError(applicationErrorObj);
    }
    const existingRentPaymentDomainObj = RentPaymentHistoryMapper.fromEntityToDomain(
      existingRentPayment,
    );

    const rentAmountDomainObj = RentPaymentHistory.updateRentPaymentFromGraphQlInput(
      existingRentPaymentDomainObj,
      rentPaymenGraphQlInput,
    );
    const rentAmountEntity = RentPaymentHistoryMapper.fromDomainToEntity(rentAmountDomainObj);

    const rentPaymentUpdatedObj = await this.rentPaymentRepository.updateRentPayment(
      rentAmountEntity,
    );
    return RentPaymentHistoryMapper.fromDomainToGraphQL(
      RentPaymentHistoryMapper.fromEntityToDomain(rentPaymentUpdatedObj),
    );
  }

  public async getRentPaymentHistory(
    contractId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<TotalRentPayment> {
    const rentPaymentsBetweenDate = await this.rentPaymentRepository.getAllRentPaymentsForContractId(
      contractId,
      startDate,
      endDate,
    );
    return this.processRentPaymentArray(rentPaymentsBetweenDate);
  }

  // eslint-disable-next-line class-methods-use-this
  private processRentPaymentArray(
    rentPaymentsBetweenDate: RentPaymentHistoryEntity[],
  ): TotalRentPayment {
    const totalRentPaymentObj: TotalRentPayment = {
      sum: 0,
      items: [],
    };

    rentPaymentsBetweenDate.forEach((rentPaymentHistoryDTOObj: RentPaymentHistoryEntity) => {
      totalRentPaymentObj.sum += rentPaymentHistoryDTOObj.rentAmount;

      const rentPayment: RentPayment = RentPaymentHistoryMapper.fromDomainToGraphQL(
        RentPaymentHistoryMapper.fromEntityToDomain(rentPaymentHistoryDTOObj),
      );

      totalRentPaymentObj.items.push(rentPayment);
    });

    return totalRentPaymentObj;
  }

  public deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    return this.rentPaymentRepository.deleteRentPayment(rentPaymentId);
  }
}
