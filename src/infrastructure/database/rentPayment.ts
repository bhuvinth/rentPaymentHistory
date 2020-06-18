import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'rent_payments' })
export default class RentPaymentData {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public contractId: number;

  @Column()
  public description: string;

  @Column()
  public rentAmount: number;

  @Column()
  public paymentDate: Date;

  @Column()
  public isImported: boolean;

  @Column({ default: false })
  public isDeleted: boolean;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;
}
