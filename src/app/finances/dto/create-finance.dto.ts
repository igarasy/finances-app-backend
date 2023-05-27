import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateFinanceDto{
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  investment: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsIn([0,1])
  isDone: number;

  //if the property will be optional, whe can use  @ApiPropertyOptional()
}