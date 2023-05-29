import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesEntity } from './entity/expenses.entity';
import { FinancesController } from './expenses.controller';
import { FinancesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesEntity])],
  controllers: [FinancesController],
  providers: [FinancesService],
  exports: [FinancesService],
})
export class ExpensesModule {}
