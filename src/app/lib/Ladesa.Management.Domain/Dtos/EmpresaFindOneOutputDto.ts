export class EmpresaFindOneOutputDto {
  id!: string;
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  idEnderecoFk!: string;
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}
