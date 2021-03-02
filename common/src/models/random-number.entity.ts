import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RandomNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'random_number' })
  randomNumber: number;
}
