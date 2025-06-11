using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** NivelFormacao. */
model NivelFormacao {
  ...EntityIdUuid;

  /** Apelido do nível de formação. */
  @minLength(1)
  slug: string;

  ...EntityDated;
}
