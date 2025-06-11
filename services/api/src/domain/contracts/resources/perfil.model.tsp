using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

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
