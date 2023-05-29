import { ExpensesEntity } from "../entity/expenses.entity";

//whe can use OmitType(FinancesEntity, ['updatedAt, createdAt']) this will allow to omit some parameters of that are extended to this class
//The PartialType(financesEntity) allow to not show the asterisco in the response
export class IndexFinancesSwagger extends ExpensesEntity{
  
}