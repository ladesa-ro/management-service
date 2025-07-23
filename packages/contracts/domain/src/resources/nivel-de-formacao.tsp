using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** NivelFormacao. */
model NivelFormacao {
  ...EntityIdUuid;

  /** Apelido do nível de formação. */
  @minLength(1)
  slug: string;

  ...EntityDated;
}
