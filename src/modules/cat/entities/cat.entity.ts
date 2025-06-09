import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cat' })
export class Cat {
  @Column({ type: 'int', nullable: true })
  age: number | null;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;
}
