export class EmpresaListQuery {
  page?: number;
  limit?: number;
  search?: string;
  filterCnpj?: string[];
  filterNomeFantasia?: string[];
  filterIdEnderecoFk?: string[];
}
