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
  Query,
} from '@nestjs/common';
import { FinancesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexFinancesSwagger } from './swagger/index-expense-swagger';
import { CreateFinanceSwagger } from './swagger/create-expense-swagger';
import { ShowFinanceSwagger } from './swagger/show-expense-swagger';
import { UpdateFinanceSwagger } from './swagger/update-expense-swagger';
import { BadRequestSwagger } from './helpers/swagger/bad-request-swagger';
import { NotFoundSwagger } from './helpers/swagger/not-found-swagger';

@Controller('api/v1/expenses')
@ApiTags('Expenses')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get()
  @ApiOperation({ summary: 'This get will return all expenses registers' })
  @ApiResponse({
    status: 200,
    description: 'List of expenses',
    type: IndexFinancesSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  async index() {
    return await this.financesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'This post will create a new expense' })
  @ApiResponse({
    status: 201,
    description: 'New expense registered',
    type: CreateFinanceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateExpenseDto) {
    return await this.financesService.create(body);
  }

  /* GET http://localhost:3000/api/v1/finances/:id */
  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Expenses data returned with sucess',
    type: ShowFinanceSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'This get will return the expense with the given id',
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'This put will update the expense with the given id',
  })
  @ApiResponse({
    status: 200,
    description: 'Expense updated with sucess',
    type: UpdateFinanceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateExpenseDto,
  ) {
    return await this.financesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'This delete will delete the expense from the db',
  })
  @ApiResponse({
    status: 204,
    description: 'Expense data deleted with sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.deleteById(id);
  }
}
