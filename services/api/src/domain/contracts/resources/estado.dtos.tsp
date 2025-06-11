using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um estado. */
model EstadoView {
  ...Estado;
}

/**
 * Dados de entrada para encontrar um estado por id.
 */
model EstadoFindOneInputView is PickProperties<EstadoView, "id">;

/**
 * Visão FindOne de um estado.
 */
model EstadoFindOneResultView {
  //
  ...PickProperties<EstadoView, "id">;

  ...PickProperties<EstadoView, "nome">;
  ...PickProperties<EstadoView, "sigla">;
}

/** Resultados da busca a estados. */
model EstadoListResultView is Pagination.Result.View<EstadoFindOneResultView>;
