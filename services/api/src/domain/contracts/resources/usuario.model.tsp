using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Usuário. */
model Usuario {
  ...EntityIdUuid;

  /** Nome do usuário. */
  @minLength(1)
  nome: string | null;

  /** Matrícula SIAPE do usuário. */
  @minLength(1)
  matriculaSiape: string | null;

  /** E-mail do usuário. */
  @format("email")
  email: string | null;

  /** Diz que o usuário tem poderes de administrador. */
  isSuperUser: boolean;

  /** Imagem de capa do usuário. */
  imagemCapa: Imagem | null;

  /** Imagem de perfil do usuário. */
  imagemPerfil: Imagem | null;

  ...EntityDated;
}
