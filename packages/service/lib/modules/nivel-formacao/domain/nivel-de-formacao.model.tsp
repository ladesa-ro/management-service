using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** NivelFormacao. */
model NivelFormacao {
  ...EntityIdUuid;

  /** Apelido do nível de formação. */
  @minLength(1)
  slug: string;

  ...EntityDated;
}
