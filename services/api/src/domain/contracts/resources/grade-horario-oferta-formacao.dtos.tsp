using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;
using Ladesa.Domain.v4.Schemas;

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model GradeHorarioOfertaFormacaoFindOneInputView {
  id: GradeHorarioOfertaFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model GradeHorarioOfertaFormacaoFindOneResultView {
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
model GradeHorarioOfertaFormacaoInputCreateView {
  campus: CampusFindOneInputView;
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model GradeHorarioOfertaFormacaoInputUpdateView
  is OptionalProperties<GradeHorarioOfertaFormacaoInputCreateView>;

/** Resultados da busca a GradeHorarioOfertaFormacaos. */
model GradeHorarioOfertaFormacaoListResultView
  is Pagination.Result.View<GradeHorarioOfertaFormacaoFindOneResultView>;
