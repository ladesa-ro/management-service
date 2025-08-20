using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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
