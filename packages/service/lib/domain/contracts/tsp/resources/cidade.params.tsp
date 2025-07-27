using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma cidade. */
model CidadeView {
  ...OmitProperties<Cidade, "estado">;
  estado: EstadoFindOneOutput;
}

/**
 * Dados de entrada para encontrar uma cidade por id.
 */
model CidadeFindOneInput is PickProperties<CidadeView, "id">;

/**
 * Visão FindOne de uma cidade.
 */
model CidadeFindOneOutput {
  //
  ...PickProperties<CidadeView, "id">;

  ...PickProperties<CidadeView, "nome">;
  ...PickProperties<CidadeView, "estado">;
}

/** Dados de entrada para a da busca a campi. */
model CidadeListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a cidades. */
model CidadeListOutput is Pagination.Output.View<CidadeFindOneOutput>;
