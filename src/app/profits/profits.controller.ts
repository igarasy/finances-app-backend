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
import { ProfitsService } from './profits.service';
import { CreateProfitDto } from './dto/create-profit.dto';
import { UpdateExpenseDto } from './dto/update-profit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexProfitSwagger } from './swagger/index-profit-swagger';
import { CreateProfitSwagger } from './swagger/create-profit-swagger';
import { ShowProfitSwagger } from './swagger/show-profit-swagger';
import { UpdateProfitSwagger } from './swagger/update-profit-swagger';
import { BadRequestSwagger } from './helpers/swagger/bad-request-swagger';
import { NotFoundSwagger } from './helpers/swagger/not-found-swagger';

@Controller('api/v1/profits')
@ApiTags('Profits')
export class FinancesController {
  constructor(private readonly financesService: ProfitsService) {}

  @Get()
  @ApiOperation({ summary: 'This get will return all profits registers' })
  @ApiResponse({
    status: 200,
    description: 'List of profits',
    type: IndexProfitSwagger,
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
    type: CreateProfitSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateProfitDto) {
    return await this.financesService.create(body);
  }

  /* GET http://localhost:3000/api/v1/finances/:id */
  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Profit data returned with sucess',
    type: ShowProfitSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Profit not found',
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
    description: 'Profit updated with sucess',
    type: UpdateProfitSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Profit not found',
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
    summary: 'This delete will delete the invesment from the db',
  })
  @ApiResponse({
    status: 204,
    description: 'Profit data deleted with sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'Profit not found',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financesService.deleteById(id);
  }
}
