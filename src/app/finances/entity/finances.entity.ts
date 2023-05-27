import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'finances' })
export class FinancesEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  investment: string;
  
  @Column({name: 'isDone', type: 'tinyint', width: 1})
  @ApiProperty()
  isDone: number;

  @CreateDateColumn({name: 'created_at'})
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({name: 'deleted_at'})
  @ApiProperty()
  deletedAt: string;
}
