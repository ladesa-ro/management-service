using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** ProfessorDisponibilidade. */
model ProfessorDisponibilidade {
  ...EntityIdUuid;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  /** Professor. */
  perfil: Perfil;

  ...EntityDated;
}
