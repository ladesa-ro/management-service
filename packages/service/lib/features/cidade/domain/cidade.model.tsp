using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Cidade. */
model Cidade {
  ...EntityIdInteger;

  /** Nome oficial da cidade. */
  nome: string;

  /** Estado da cidade */
  estado: Estado;
}
