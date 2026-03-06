/**
 * Tipagem para atualização de Ambiente
 */
export interface AmbienteUpdateDto {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
}
