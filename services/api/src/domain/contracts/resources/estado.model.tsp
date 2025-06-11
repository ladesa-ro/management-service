using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Estado. */
model Estado {
  ...EntityIdInteger;

  /** Nome oficial do estado. */
  nome: string;

  /** Sigla do estado. */
  @Metadata.Constraints.EnderecoEstadoSigla
  sigla: string;
}
