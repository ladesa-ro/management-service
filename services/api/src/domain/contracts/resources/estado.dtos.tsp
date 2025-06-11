using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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

/** Resultados da busca a estados. */
model EstadoListOutput is Pagination.Result.View<EstadoFindOneOutput>;
