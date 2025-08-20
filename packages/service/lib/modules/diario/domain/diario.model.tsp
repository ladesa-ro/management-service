using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Diario. */
model Diario {
  ...EntityIdUuid;

  /** Situação do diário. */
  ativo: boolean;

  /** Calendário Letivo vinculado ao diário. */
  calendarioLetivo: CalendarioLetivo;

  /** Turma vinculada ao diário. */
  turma: Turma;

  /** Disciplina vinculada ao diário. */
  disciplina: Disciplina;

  /** Ambiente padrão. */
  ambientePadrao: Ambiente | null;

  /** Imagem de capa do diário. */
  imagemCapa: Imagem | null;

  ...EntityDated;
}
