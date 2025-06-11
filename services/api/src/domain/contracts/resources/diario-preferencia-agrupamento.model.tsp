using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamento {
  ...EntityIdUuid;

  /** Início da vigência da preferência de agrupamento. */
  dataInicio: date;

  /** Fim da vigência da preferência de agrupamento. */
  dataFim: date | null;

  /** Dia da semana. */
  diaSemanaIso: uint8;

  /** Quantidade de aulas seguidas. */
  aulasSeguidas: uint8;

  /** Intervalo de tempo. */
  intervaloDeTempo: IntervaloDeTempo;

  /** Diário vinculado. */
  diario: Diario;

  ...EntityDated;
}
