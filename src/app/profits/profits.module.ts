import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitsEntity } from './entity/profits.entity';
import { FinancesController } from './profits.controller';
import { ProfitsService } from './profits.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfitsEntity])],
  controllers: [FinancesController],
  providers: [ProfitsService],
  exports: [ProfitsService],
})
export class ProfitsModule {}
