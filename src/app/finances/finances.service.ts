import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FinancesEntity } from './entity/finances.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(FinancesEntity)
    private readonly financesRepository: Repository<FinancesEntity>,
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

  async create(data: CreateFinanceDto) {
    return await this.financesRepository.save(
      this.financesRepository.create(data),
    );
  }

  async update(id: string, data: UpdateFinanceDto) {
    const finance = await this.financesRepository.findOneOrFail({ where: { id } });
    this.financesRepository.merge(finance, data);
    return await this.financesRepository.save(finance);
  }

  async deleteById(id: string) {
    await this.financesRepository.findOneOrFail({ where: { id } });
    await this.financesRepository.softDelete(id);
  }
}
