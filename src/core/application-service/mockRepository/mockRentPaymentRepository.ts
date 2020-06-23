/* eslint-disable no-param-reassign */
import RentPaymentRepositoryInterface from '@main/core/infrastructure/database/rentPaymentRepositoryInterface';
import RentPaymentHistoryEntity from '@main/core/infrastructure/database/rentPaymentHistoryEntity';
import UnableToDeleteRentPayments from '@main/core/infrastructure/errors/unableToDeleteRentPayment';

export default class MockRepositoryImplementation implements RentPaymentRepositoryInterface {
  private idSequence = 1;

  private rentPaymentHistoryArray: RentPaymentHistoryEntity[] = [];

  async addRentPayment(
    rentPaymentDataObj: RentPaymentHistoryEntity,
  ): Promise<RentPaymentHistoryEntity> {
    this.idSequence += 1;
    rentPaymentDataObj.id = this.idSequence;
    rentPaymentDataObj.updatedAt = new Date();
    this.rentPaymentHistoryArray.push(rentPaymentDataObj);
    return rentPaymentDataObj;
  }

  async updateRentPayment(
    rentPaymentDataObj: RentPaymentHistoryEntity,
  ): Promise<RentPaymentHistoryEntity> {
    this.rentPaymentHistoryArray.forEach((rentPayment, index) => {
      if (rentPayment.id === rentPaymentDataObj.id) {
        rentPaymentDataObj.updatedAt = new Date();
        this.rentPaymentHistoryArray[index] = rentPaymentDataObj;
      }
    });
    return rentPaymentDataObj;
  }

  async deleteRentPayment(rentPaymentId: number): Promise<boolean> {
    let found = false;
    this.rentPaymentHistoryArray.forEach((rentPayment, index) => {
      if (rentPayment.id === rentPaymentId) {
        found = true;
        this.rentPaymentHistoryArray.splice(index, 1);
      }
    });
    if (!found) {
      throw new UnableToDeleteRentPayments();
    }
    return found;
  }

  async getAllRentPaymentsForContractId(
    contractId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<RentPaymentHistoryEntity[]> {
    let rentPaymentArray = this.rentPaymentHistoryArray.filter(rentPayment => {
      return (
        rentPayment.contractId === contractId &&
        rentPayment.paymentDate >= startDate &&
        rentPayment.paymentDate <= endDate
      );
    });
    rentPaymentArray = rentPaymentArray.sort((rentPaymentA, rentPaymentB) => {
      if (rentPaymentA.updatedAt > rentPaymentB.updatedAt) return -1;
      if (rentPaymentA.updatedAt < rentPaymentB.updatedAt) return 1;
      return 0;
    });
    return rentPaymentArray;
  }

  async getRentPaymentById(rentId: number): Promise<RentPaymentHistoryEntity> {
    const rentPaymentObj = this.rentPaymentHistoryArray.filter(
      rentPayment => rentPayment.id === rentId,
    );
    if (rentPaymentObj) {
      return rentPaymentObj[0];
    }
    throw new Error();
  }
}
