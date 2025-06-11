using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Dados de entrada para buscar dias do calendário. */
model CalendarioDiasFindInputView {
  /** Ano */
  ano: int32;

  /** Mês opcional. */
  mes?: int32;
}

/** Resultado da busca de dias do calendário. */
model CalendarioDiasFindResultView {
  /** Lista de dias do calendário encontrados. */
  dias: DiaCalendario[];
}
