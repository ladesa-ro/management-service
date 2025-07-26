using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Vínculo. */
model Perfil {
  ...EntityIdUuid;

  /** Indica se o vínculo está ativo. */
  ativo: boolean;

  /** Cargo do usuário no vínculo. */
  cargo: string;

  /** Campus associado ao vínculo. */
  campus: Campus;

  /** Usuário associado ao vínculo. */
  usuario: Usuario;

  ...EntityDated;
}
