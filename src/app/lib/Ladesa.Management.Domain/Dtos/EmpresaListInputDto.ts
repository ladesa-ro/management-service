export class EmpresaListInputDto {
  page?: number;
  limit?: number;
  search?: string;
  filterCnpj?: string[];
  filterIdEnderecoFk?: string[];
}
