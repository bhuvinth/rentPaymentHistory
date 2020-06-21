/* eslint-disable no-useless-constructor */
import RentPaymentHistoryDTO from '../infrastructure/database/rentPaymentHistoryDTO';
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

export default class RentPaymentHistoryService {
  public constructor(
    private rentPaymentRepository: RentPaymentRepositoryInterface = new RentPaymentRepository(), // eslint-disable-next-line no-empty-function
  ) {}

  public async addPaymentRecord(rentPaymentInputObj: RentPaymentInput): Promise<RentPayment> {
    const rentAmountDomainObj = RentPaymentHistory.createRentPaymentFromGraphQlInput(
      rentPaymentInputObj,
    );
    const rentAmountDTO = RentPaymentHistoryMapper.fromDomainToDTO(rentAmountDomainObj);

    const rentPaymentCreatedObj = await this.rentPaymentRepository.addRentPayment(rentAmountDTO);

    return RentPaymentHistoryMapper.fromDomainToGraphQL(
      RentPaymentHistoryMapper.fromDtoToDomain(rentPaymentCreatedObj),
    );
  }

  public async updatePaymentRecord(
    rentPaymenGraphQlInput: RentPaymentUpdateInput,
  ): Promise<RentPayment> {
    const existingRentPayment = await this.rentPaymentRepository.getRentPaymentById(
      rentPaymenGraphQlInput.rentId,
    );
    if (!existingRentPayment) {
      throw new Error('Invalid Rent Id');
    }
    const existingRentPaymentDomainObj = RentPaymentHistoryMapper.fromDtoToDomain(
      existingRentPayment,
    );

    const rentAmountDomainObj = RentPaymentHistory.updateRentPaymentFromGraphQlInput(
      existingRentPaymentDomainObj,
      rentPaymenGraphQlInput,
    );
    const rentAmountDTO = RentPaymentHistoryMapper.fromDomainToDTO(rentAmountDomainObj);

    const rentPaymentUpdatedObj = await this.rentPaymentRepository.updateRentPayment(rentAmountDTO);
    return RentPaymentHistoryMapper.fromDomainToGraphQL(
      RentPaymentHistoryMapper.fromDtoToDomain(rentPaymentUpdatedObj),
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
    rentPaymentsBetweenDate: RentPaymentHistoryDTO[],
  ): TotalRentPayment {
    const totalRentPaymentObj: TotalRentPayment = {
      sum: 0,
      items: [],
    };

    // eslint-disable-next-line array-callback-return
    rentPaymentsBetweenDate.map((rentPaymentHistoryDTOObj: RentPaymentHistoryDTO) => {
      totalRentPaymentObj.sum += rentPaymentHistoryDTOObj.rentAmount;

      const rentPayment: RentPayment = this.fromRentPaymentDtoToRentPaymentGraphQlType(
        rentPaymentHistoryDTOObj,
      );

      totalRentPaymentObj.items?.push(rentPayment);
    });
    return totalRentPaymentObj;
  }

  // eslint-disable-next-line class-methods-use-this
  private fromRentPaymentDtoToRentPaymentGraphQlType(
    rentPaymentHistoryDTOObj: RentPaymentHistoryDTO,
  ): RentPayment {
    const rentPayment: RentPayment = {
      contractId: rentPaymentHistoryDTOObj.contractId,
      createdAt: rentPaymentHistoryDTOObj.created,
      isImported: rentPaymentHistoryDTOObj.isImported,
      rentId: rentPaymentHistoryDTOObj.id,
      time: rentPaymentHistoryDTOObj.paymentDate,
      updatedAt: rentPaymentHistoryDTOObj.updated,
      value: rentPaymentHistoryDTOObj.rentAmount,
      description: rentPaymentHistoryDTOObj.description,
    };
    return rentPayment;
  }

  public deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    return this.rentPaymentRepository.deleteRentPayment(rentPaymentId);
  }
}
