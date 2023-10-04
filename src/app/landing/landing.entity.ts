import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Landing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  preferredContactDate: Date;
}