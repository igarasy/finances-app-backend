import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'expenses' })
export class ExpensesEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  expense: string;
  
  @Column({name: 'value', type: 'int'})
  @ApiProperty()
  value: number;

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
