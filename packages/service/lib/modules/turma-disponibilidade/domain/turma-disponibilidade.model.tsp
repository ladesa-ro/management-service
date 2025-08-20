using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** TurmaDisponibilidade. */
model TurmaDisponibilidade {
  ...EntityIdUuid;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  /** Turma. */
  turma: Turma;

  ...EntityDated;
}
