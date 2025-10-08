using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de uma Disponibilidade. */
model DisponibilidadeView {
  ...Disponibilidade;
}

/** Dados de entrada para encontrar uma Disponibilidade por ID. */
model DisponibilidadeFindOneInput {
  id: Disponibilidade.id;
}

/** Visão FindOne de uma Disponibilidade. */
model DisponibilidadeFindOneOutput {
  ...PickProperties<DisponibilidadeView, "id">;
  ...PickProperties<DisponibilidadeView, "dataInicio" | "dataFim">;
  ...PickProperties<
    DisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma Disponibilidade. */
model DisponibilidadeCreateInput {
  dataInicio: date;
  dataFim: date | null;
}

/** Dados de entrada para a atualização de uma Disponibilidade. */
model DisponibilidadeUpdateInput
  is OptionalProperties<DisponibilidadeCreateInput>;

model DisponibilidadeListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Disponibilidades. */
model DisponibilidadeListOutput
  is Pagination.Output.View<DisponibilidadeFindOneOutput>;
