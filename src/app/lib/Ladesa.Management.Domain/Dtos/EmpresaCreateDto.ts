/**
 * Dados necessários para criar uma empresa
 */
export interface EmpresaCreateDto {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
}
