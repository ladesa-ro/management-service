import "@typespec/json-schema";

using TypeSpec.JsonSchema;

using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Estado. */
model Estado {
  ...EntityIdInteger;

  /** Nome oficial do estado. */
  nome: string;

  /** Sigla do estado. */
  // @extension("x-validate-estado-sigla", Json<true>)
  sigla: string;
}
