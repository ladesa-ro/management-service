using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Dados de entrada para buscar dias do calendário. */
model CalendarioDiasFindInput {
  /** Ano */
  ano: int32;

  /** Mês opcional. */
  mes?: int32;
}

/** Resultado da busca de dias do calendário. */
model CalendarioDiasFindOutput {
  /** Lista de dias do calendário encontrados. */
  dias: DiaCalendario[];
}
