import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Controller('api/v1/finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get()
  async index() {
    return await this.financesService.findAll();
  }

  @Post()
  async create(@Body() body: CreateFinanceDto) {
    return await this.financesService.create(body);
  }

  /* GET http://localhost:3000/api/v1/finances/:id */
  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateFinanceDto) {
    return await this.financesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.deleteById(id);
  }
}
