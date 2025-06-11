using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** TurmaDisponibilidade. */
model TurmaDisponibilidade {
  ...EntityIdUuid;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  /** Turma. */
  turma: Turma;

  ...EntityDated;
}
