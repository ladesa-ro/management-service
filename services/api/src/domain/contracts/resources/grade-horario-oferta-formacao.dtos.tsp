using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;
using Ladesa.ManagementService.Domain.Contracts;

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

/** Resultados da busca a GradeHorarioOfertaFormacaos. */
model GradeHorarioOfertaFormacaoListOutput
  is Pagination.Result.View<GradeHorarioOfertaFormacaoFindOneOutput>;
