import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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

  @Column({ type: 'date', nullable: true })
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

}