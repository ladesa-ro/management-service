using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Cidade. */
model Cidade {
  ...EntityIdInteger;

  /** Nome oficial da cidade. */
  nome: string;

  /** Estado da cidade */
  estado: Estado;
}
