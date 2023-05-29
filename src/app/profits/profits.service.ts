import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfitsEntity } from './entity/profits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfitDto } from './dto/create-profit.dto';
import { UpdateExpenseDto } from './dto/update-profit.dto';

@Injectable()
export class ProfitsService {
  constructor(
    @InjectRepository(ProfitsEntity)
    private readonly financesRepository: Repository<ProfitsEntity>,
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

  async create(data: CreateProfitDto) {
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
