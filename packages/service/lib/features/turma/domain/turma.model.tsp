using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Turma. */
model Turma {
  ...EntityIdUuid;

  /** Período da Turma. */
  @minLength(1)
  periodo: string;

  /** Curso da Turma. */
  curso: Curso;

  /** Ambiente padrão da sala de aula. */
  ambientePadraoAula: Ambiente | null;

  /** Imagem de capa da Turma. */
  imagemCapa: Imagem | null;

  ...EntityDated;
}
