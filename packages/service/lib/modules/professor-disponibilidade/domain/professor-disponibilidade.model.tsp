using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** ProfessorDisponibilidade. */
model ProfessorDisponibilidade {
  ...EntityIdUuid;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  /** Professor. */
  perfil: Perfil;

  ...EntityDated;
}
