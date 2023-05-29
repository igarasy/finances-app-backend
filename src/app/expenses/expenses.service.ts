import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpensesEntity } from './entity/expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private readonly financesRepository: Repository<ExpensesEntity>,
  ) {}

  async findAll() {
    return await this.financesRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.financesRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateExpenseDto) {
    return await this.financesRepository.save(
      this.financesRepository.create(data),
    );
  }

  async update(id: string, data: UpdateExpenseDto) {
    const finance = await this.financesRepository.findOneOrFail({ where: { id } });
    this.financesRepository.merge(finance, data);
    return await this.financesRepository.save(finance);
  }

  async deleteById(id: string) {
    await this.financesRepository.findOneOrFail({ where: { id } });
    await this.financesRepository.softDelete(id);
  }
}
