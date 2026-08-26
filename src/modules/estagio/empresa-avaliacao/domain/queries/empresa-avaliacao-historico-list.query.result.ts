export class EmpresaAvaliacaoHistoricoQueryResult {
  id!: string;
  avaliacaoId!: string;
  usuarioId!: string;
  usuarioNome!: string | null;
  ratingAnterior!: number | null;
  ratingNovo!: number;
  comentarioAnterior!: string | null;
  comentarioNovo!: string | null;
  acao!: string;
  dateCreated!: string;
}
