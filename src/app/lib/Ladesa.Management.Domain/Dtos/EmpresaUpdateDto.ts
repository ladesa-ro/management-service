/**
 * Dados para atualização de empresa
 */
export interface EmpresaUpdateDto {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  idEnderecoFk?: string;
}
