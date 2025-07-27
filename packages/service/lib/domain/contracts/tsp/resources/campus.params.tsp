using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um campus. */
model CampusView {
  ...OmitProperties<Campus, "endereco">;
  endereco: EnderecoFindOneOutput;
}

/**
 * Dados de entrada para encontrar um campus por id.
 */
model CampusFindOneInput {
  id: Campus.id;
}

/**
 * Visão FindOne de um campus.
 */
model CampusFindOneOutput {

  ...PickProperties<CampusView, "id">;

  ...PickProperties<CampusView, "nomeFantasia">;
  ...PickProperties<CampusView, "razaoSocial">;
  ...PickProperties<CampusView, "apelido">;
  ...PickProperties<CampusView, "cnpj">;

  ...PickProperties<CampusView, "endereco">;

  ...PickProperties<CampusView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a da busca a campi. */
model CampusListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a campi. */
model CampusListOutput is Pagination.Output.View<CampusFindOneOutput>;

/**
 * Dados de entrada para a criação de um campus.
 */
model CampusCreateInput {
  ...PickProperties<CampusView, "nomeFantasia">;
  ...PickProperties<CampusView, "razaoSocial">;
  ...PickProperties<CampusView, "apelido">;
  ...PickProperties<CampusView, "cnpj">;
  endereco: EnderecoInput;
}

/** Dados de entrada para a atualização de um campus. */
model CampusUpdateInput is OptionalProperties<CampusCreateInput>;
