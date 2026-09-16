export interface EmpresaAvaliavelQueryResult {
  empresaId: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  cnpj: string;
  concluido: boolean;
  avaliada: boolean;
  avaliacaoId: string | null;
}
