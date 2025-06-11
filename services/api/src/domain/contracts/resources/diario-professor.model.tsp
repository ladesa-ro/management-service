using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

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
