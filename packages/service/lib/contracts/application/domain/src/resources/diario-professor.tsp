using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** DiarioProfessor. */
model DiarioProfessor {
  ...EntityIdUuid;

  /** Situação do vínculo. */
  situacao: boolean;

  /** Perfil do usuário ao campus. */
  perfil: Perfil;

  /** Diário vinculado. */
  diario: Diario;

  ...EntityDated;
}
