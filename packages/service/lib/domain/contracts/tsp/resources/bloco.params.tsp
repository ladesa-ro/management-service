using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um bloco. */
model BlocoView {
  ...OmitProperties<Bloco, "campus" | "ambientes" | "imagemCapa">;
  campus: CampusFindOneOutput;
  imagemCapa: ImagemFindOneOutput | null;
  ambientes: AmbienteFindOneOutput[];
}

/**
 * Dados de entrada para encontrar um bloco por id.
 */
model BlocoFindOneInput {
  id: Bloco.id;
}

/**
 * Visão FindOne de um bloco.
 */
model BlocoFindOneOutput {

  ...PickProperties<BlocoView, "id">;

  ...PickProperties<BlocoView, "nome">;
  ...PickProperties<BlocoView, "codigo">;

  ...PickProperties<BlocoView, "campus">;

  ...PickProperties<BlocoView, "imagemCapa">;

  ...PickProperties<BlocoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um bloco. */
model BlocoCreateInput {
  ...PickProperties<BlocoView, "nome">;
  ...PickProperties<BlocoView, "codigo">;
  campus: CampusFindOneInput;
}

/** Dados de entrada para a atualização de um bloco. */
model BlocoUpdateInput is OptionalProperties<BlocoCreateInput>;

/** Dados de entrada para a da busca a Blocos. */
model BlocoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a blocos. */
model BlocoListOutput is Pagination.Output.View<BlocoFindOneOutput>;
