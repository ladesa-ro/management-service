using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um campus. */
model CampusView {
  ...OmitProperties<Campus, "endereco">;
  endereco: EnderecoFindOneResultView;
}

/**
 * Dados de entrada para encontrar um campus por id.
 */
model CampusFindOneInputView {
  id: Campus.id;
}

/**
 * Visão FindOne de um campus.
 */
model CampusFindOneResultView {
  //
  ...PickProperties<CampusView, "id">;

  ...PickProperties<CampusView, "nomeFantasia">;
  ...PickProperties<CampusView, "razaoSocial">;
  ...PickProperties<CampusView, "apelido">;
  ...PickProperties<CampusView, "cnpj">;

  //
  ...PickProperties<CampusView, "endereco">;

  //
  ...PickProperties<CampusView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Resultados da busca a campi. */
model CampusListResultView is Pagination.Result.View<CampusFindOneResultView>;

/**
 * Dados de entrada para a criação de um campus.
 */
model CampusInputCreateView {
  ...PickProperties<CampusView, "nomeFantasia">;
  ...PickProperties<CampusView, "razaoSocial">;
  ...PickProperties<CampusView, "apelido">;
  ...PickProperties<CampusView, "cnpj">;
  endereco: EnderecoInput;
}

/** Dados de entrada para a atualização de um campus. */
model CampusInputUpdateView is OptionalProperties<CampusInputCreateView>;
