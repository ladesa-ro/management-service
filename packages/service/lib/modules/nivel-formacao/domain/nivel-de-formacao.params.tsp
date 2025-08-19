using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de um nível de formação. */
model NivelFormacaoView {
  ...NivelFormacao;
}

/** Dados de entrada para encontrar um nível de formação por ID. */
model NivelFormacaoFindOneInput {
  id: NivelFormacao.id;
}

/** Visão FindOne de um nível de formação. */
model NivelFormacaoFindOneOutput {
  ...PickProperties<NivelFormacaoView, "id">;
  ...PickProperties<NivelFormacaoView, "slug">;
  ...PickProperties<
    NivelFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um nível de formação. */
model NivelFormacaoCreateInput {
  ...PickProperties<NivelFormacaoView, "slug">;
}

/** Dados de entrada para a atualização de um nível de formação. */
model NivelFormacaoUpdateInput is OptionalProperties<NivelFormacaoCreateInput>;

model NivelFormacaoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca aos níveis de formações. */
model NivelFormacaoListOutput
  is Pagination.Output.View<NivelFormacaoFindOneOutput>;
