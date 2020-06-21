/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRentPaymentHistoryTable1592700426993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(``);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
