using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma cidade. */
model CidadeView {
  ...OmitProperties<Cidade, "estado">;
  estado: EstadoFindOneResultView;
}

/**
 * Dados de entrada para encontrar uma cidade por id.
 */
model CidadeFindOneInputView is PickProperties<CidadeView, "id">;

/**
 * Visão FindOne de uma cidade.
 */
model CidadeFindOneResultView {
  //
  ...PickProperties<CidadeView, "id">;

  ...PickProperties<CidadeView, "nome">;
  ...PickProperties<CidadeView, "estado">;
}

/** Resultados da busca a cidades. */
model CidadeListResultView is Pagination.Result.View<CidadeFindOneResultView>;
