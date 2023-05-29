import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfitDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  profit: string;

  @IsNotEmpty()
  @ApiProperty()
  value: number;

  //if the property will be optional, whe can use  @ApiPropertyOptional()
}
