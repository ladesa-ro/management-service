using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um Intervalo de Tempo. */
model IntervaloDeTempoView {
  ...IntervaloDeTempo;
}

/** Visão FindOne de um Intervalo de Tempo. */
model IntervaloDeTempoFindOneResultView {
  ...PickProperties<IntervaloDeTempoView, "id">;
  ...PickProperties<IntervaloDeTempoView, "periodoInicio">;
  ...PickProperties<IntervaloDeTempoView, "periodoFim">;
  ...PickProperties<
    IntervaloDeTempoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para um Intervalo de Tempo. */
model IntervaloDeTempoInputView {
  ...PickProperties<IntervaloDeTempoView, "periodoInicio">;
  ...PickProperties<IntervaloDeTempoView, "periodoFim">;
}
