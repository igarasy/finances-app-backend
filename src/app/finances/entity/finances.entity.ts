import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'finances' })
export class FinancesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  investment: string;
  
  @Column({name: 'isDone', type: 'tinyint', width: 1})
  isDone: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: string;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: string;
}
