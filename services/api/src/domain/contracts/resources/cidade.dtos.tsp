using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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

/** Resultados da busca a cidades. */
model CidadeListOutput is Pagination.Result.View<CidadeFindOneOutput>;
