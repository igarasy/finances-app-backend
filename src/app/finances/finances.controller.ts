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
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexFinancesSwagger } from './swagger/index-finances-swagger';
import { CreateFinanceSwagger } from './swagger/create-finance-swagger';
import { ShowFinanceSwagger } from './swagger/show-finance-swagger';
import { UpdateFinanceSwagger } from './swagger/update-finance-swagger';
import { BadRequestSwagger } from './helpers/swagger/bad-request-swagger';
import { NotFoundSwagger } from './helpers/swagger/not-found-swagger';

@Controller('api/v1/finances')
@ApiTags('Finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get()
  @ApiOperation({ summary: 'This get will return all finances registers' })
  @ApiResponse({
    status: 200,
    description: 'List of investments',
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
  @ApiOperation({ summary: 'This post will create a new investment' })
  @ApiResponse({
    status: 201,
    description: 'New investment registered',
    type: CreateFinanceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateFinanceDto) {
    return await this.financesService.create(body);
  }

  /* GET http://localhost:3000/api/v1/finances/:id */
  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Investment data returned with sucess',
    type: ShowFinanceSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Investment not found',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'This get will return the investment with the given id',
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'This put will update the given id of the investment',
  })
  @ApiResponse({
    status: 200,
    description: 'Investment updated with sucess',
    type: UpdateFinanceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Investment not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateFinanceDto,
  ) {
    return await this.financesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'This delete will delete the invesment from the db',
  })
  @ApiResponse({
    status: 204,
    description: 'Investment data deleted with sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'Investment not found',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.deleteById(id);
  }
}
