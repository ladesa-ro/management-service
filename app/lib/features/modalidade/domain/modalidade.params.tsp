using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de uma modalidade. */
model ModalidadeView {
  ...Modalidade;
}

/** Dados de entrada para encontrar uma modalidade por ID. */
model ModalidadeFindOneInput {
  id: Modalidade.id;
}

/** Visão FindOne de uma modalidade. */
model ModalidadeFindOneOutput {
  ...PickProperties<ModalidadeView, "id">;
  ...PickProperties<ModalidadeView, "slug">;
  ...PickProperties<
    ModalidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma modalidade. */
model ModalidadeCreateInput {
  ...PickProperties<ModalidadeView, "slug">;
}

/** Dados de entrada para a atualização de uma modalidade. */
model ModalidadeUpdateInput is OptionalProperties<ModalidadeCreateInput>;

model ModalidadeListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Modalidades. */
model ModalidadeListOutput is Pagination.Output.View<ModalidadeFindOneOutput>;
