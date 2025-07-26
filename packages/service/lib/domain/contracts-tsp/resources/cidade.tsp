using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Cidade. */
model Cidade {
  ...EntityIdInteger;

  /** Nome oficial da cidade. */
  nome: string;

  /** Estado da cidade */
  estado: Estado;
}
