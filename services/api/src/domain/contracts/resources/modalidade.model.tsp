using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Modalidade. */
model Modalidade {
  ...EntityIdUuid;

  /** Nome da modalidade. */
  @minLength(1)
  nome: string;

  /** Apelido da modalidade. */
  @minLength(1)
  slug: string;

  ...EntityDated;
}
