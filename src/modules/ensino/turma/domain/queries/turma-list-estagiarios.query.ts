/**
 * TurmaListEstagiariosQuery — query de entrada para listar os estagiários de uma turma.
 *
 * A associação Turma ↔ Estagiário é inferida pela combinação (curso.id + periodo),
 * pois não existe FK direta entre as entidades.
 */

export class TurmaListEstagiariosQuery {
  /** ID da turma cuja lista de estagiários será retornada. */
  id!: string;
}
