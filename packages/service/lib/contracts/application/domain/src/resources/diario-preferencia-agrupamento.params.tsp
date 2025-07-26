using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoView {
  ...OmitProperties<
    DiarioPreferenciaAgrupamento,
    "intervaloDeTempo" | "diario"
  >;
  intervaloDeTempo: IntervaloDeTempoFindOneOutput;
  diario: DiarioFindOneOutput;
}

/** Dados de entrada para encontrar um DiarioPreferenciaAgrupamento por ID. */
model DiarioPreferenciaAgrupamentoFindOneInput {
  id: DiarioPreferenciaAgrupamento.id;
}

/** Visão FindOne de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoFindOneOutput {
  ...PickProperties<DiarioPreferenciaAgrupamentoView, "id">;
  ...PickProperties<
    DiarioPreferenciaAgrupamentoView,
    "diaSemanaIso" | "aulasSeguidas" | "dataInicio" | "dataFim"
  >;
  ...PickProperties<
    DiarioPreferenciaAgrupamentoView,
    "intervaloDeTempo" | "diario"
  >;
  ...PickProperties<
    DiarioPreferenciaAgrupamentoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoCreateInput {
  diaSemanaIso: DiarioPreferenciaAgrupamento.diaSemanaIso;
  aulasSeguidas: DiarioPreferenciaAgrupamento.aulasSeguidas;
  dataInicio: DiarioPreferenciaAgrupamento.dataInicio;
  dataFim: DiarioPreferenciaAgrupamento.dataFim;

  //
  intervaloDeTempo: IntervaloDeTempoInput;

  //
  diario: DiarioFindOneInput;
}

/** Dados de entrada para a atualização de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoUpdateInput
  is OptionalProperties<DiarioPreferenciaAgrupamentoCreateInput>;

model DiarioPreferenciaAgrupamentoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca de DiarioPreferenciaAgrupamentos. */
model DiarioPreferenciaAgrupamentoListOutput
  is Pagination.Output.View<DiarioPreferenciaAgrupamentoFindOneOutput>;
