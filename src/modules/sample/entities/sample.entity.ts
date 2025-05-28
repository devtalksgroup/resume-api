import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sample' })
export class Sample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
