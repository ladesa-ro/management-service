using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoView {
  ...OmitProperties<
    DiarioPreferenciaAgrupamento,
    "intervaloDeTempo" | "diario"
  >;
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;
  diario: DiarioFindOneResultView;
}

/** Dados de entrada para encontrar um DiarioPreferenciaAgrupamento por ID. */
model DiarioPreferenciaAgrupamentoFindOneInputView {
  id: DiarioPreferenciaAgrupamento.id;
}

/** Visão FindOne de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoFindOneResultView {
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
model DiarioPreferenciaAgrupamentoInputCreateView {
  diaSemanaIso: DiarioPreferenciaAgrupamento.diaSemanaIso;
  aulasSeguidas: DiarioPreferenciaAgrupamento.aulasSeguidas;
  dataInicio: DiarioPreferenciaAgrupamento.dataInicio;
  dataFim: DiarioPreferenciaAgrupamento.dataFim;

  //
  intervaloDeTempo: IntervaloDeTempoInputView;

  //
  diario: DiarioFindOneInputView;
}

/** Dados de entrada para a atualização de um DiarioPreferenciaAgrupamento. */
model DiarioPreferenciaAgrupamentoInputUpdateView
  is OptionalProperties<DiarioPreferenciaAgrupamentoInputCreateView>;

/** Resultados da busca de DiarioPreferenciaAgrupamentos. */
model DiarioPreferenciaAgrupamentoListResultView
  is Pagination.Result.View<DiarioPreferenciaAgrupamentoFindOneResultView>;
