using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um Intervalo de Tempo. */
model IntervaloDeTempoView {
  ...IntervaloDeTempo;
}

/** Visão FindOne de um Intervalo de Tempo. */
model IntervaloDeTempoFindOneOutput {
  ...PickProperties<IntervaloDeTempoView, "id">;
  ...PickProperties<IntervaloDeTempoView, "periodoInicio">;
  ...PickProperties<IntervaloDeTempoView, "periodoFim">;
  ...PickProperties<
    IntervaloDeTempoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para um Intervalo de Tempo. */
model IntervaloDeTempoInput {
  ...PickProperties<IntervaloDeTempoView, "periodoInicio">;
  ...PickProperties<IntervaloDeTempoView, "periodoFim">;
}
