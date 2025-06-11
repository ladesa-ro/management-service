using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Cidade. */
model Cidade {
  ...EntityIdInteger;

  /** Nome oficial da cidade. */
  nome: string;

  /** Estado da cidade */
  estado: Estado;
}
