using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model GradeHorarioOfertaFormacaoFindOneInput {
  id: GradeHorarioOfertaFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model GradeHorarioOfertaFormacaoFindOneOutput {
  ...PickProperties<GradeHorarioOfertaFormacaoView, "id">;
  ...PickProperties<
    GradeHorarioOfertaFormacaoView,
    "campus" | "ofertaFormacao"
  >;
  ...PickProperties<
    GradeHorarioOfertaFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma oferta de formação. */
model GradeHorarioOfertaFormacaoCreateInput {
  campus: CampusFindOneInput;
  ofertaFormacao: OfertaFormacaoFindOneInput;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model GradeHorarioOfertaFormacaoUpdateInput
  is OptionalProperties<GradeHorarioOfertaFormacaoCreateInput>;

model GradeHorarioOfertaFormacaoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a GradeHorarioOfertaFormacaos. */
model GradeHorarioOfertaFormacaoListOutput
  is Pagination.Output.View<GradeHorarioOfertaFormacaoFindOneOutput>;
