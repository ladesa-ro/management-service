using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** ProfessorDisponibilidade. */
model ProfessorDisponibilidade {
  ...EntityIdUuid;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  /** Professor. */
  perfil: Perfil;

  ...EntityDated;
}
