using TypeSpec.JsonSchema;
using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Estado. */
model Estado {
  ...EntityIdInteger;

  /** Nome oficial do estado. */
  nome: string;

  /** Sigla do estado. */
  // @extension("x-validate-estado-sigla", Json<true>)
  sigla: string;
}
