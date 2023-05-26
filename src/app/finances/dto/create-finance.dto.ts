import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateFinanceDto{
  @IsNotEmpty()
  @IsString()
  investment: string;

  @IsNotEmpty()
  @IsIn([0,1])
  isDone: number;
}