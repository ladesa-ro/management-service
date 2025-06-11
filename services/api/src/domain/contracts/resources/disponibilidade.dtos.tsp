using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Disponibilidade. */
model DisponibilidadeView {
  ...Disponibilidade;
}

/** Dados de entrada para encontrar uma Disponibilidade por ID. */
model DisponibilidadeFindOneInputView {
  id: Disponibilidade.id;
}

/** Visão FindOne de uma Disponibilidade. */
model DisponibilidadeFindOneResultView {
  ...PickProperties<DisponibilidadeView, "id">;
  ...PickProperties<DisponibilidadeView, "dataInicio" | "dataFim">;
  ...PickProperties<
    DisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma Disponibilidade. */
model DisponibilidadeInputCreateView {
  dataInicio: date;
  dataFim: date | null;
}

/** Dados de entrada para a atualização de uma Disponibilidade. */
model DisponibilidadeInputUpdateView
  is OptionalProperties<DisponibilidadeInputCreateView>;

/** Resultados da busca a Disponibilidades. */
model DisponibilidadeListResultView
  is Pagination.Result.View<DisponibilidadeFindOneResultView>;
