import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  expense: string;

  @IsNotEmpty()
  @ApiProperty()
  value: number;

  //if the property will be optional, whe can use  @ApiPropertyOptional()
}
