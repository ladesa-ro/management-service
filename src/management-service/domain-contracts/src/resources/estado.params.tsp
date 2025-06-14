using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um estado. */
model EstadoView {
  ...Estado;
}

/**
 * Dados de entrada para encontrar um estado por id.
 */
model EstadoFindOneInput is PickProperties<EstadoView, "id">;

/**
 * Visão FindOne de um estado.
 */
model EstadoFindOneOutput {
  //
  ...PickProperties<EstadoView, "id">;

  ...PickProperties<EstadoView, "nome">;
  ...PickProperties<EstadoView, "sigla">;
}

model EstadoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a estados. */
model EstadoListOutput is Pagination.Output.View<EstadoFindOneOutput>;
