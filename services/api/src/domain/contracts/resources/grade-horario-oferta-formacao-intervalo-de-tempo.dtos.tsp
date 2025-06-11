using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;
using Ladesa.Domain.v4.Schemas;

/** Visão completa de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoView {
  ...OmitProperties<
    GradeHorarioOfertaFormacaoIntervaloDeTempo,
    "gradeHorarioOfertaFormacao" | "intervaloDeTempo"
  >;
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneResultView;
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputView {
  id: GradeHorarioOfertaFormacaoIntervaloDeTempo.id;
}

/** Visão FindOne de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView {
  ...PickProperties<GradeHorarioOfertaFormacaoIntervaloDeTempoView, "id">;
  ...PickProperties<
    GradeHorarioOfertaFormacaoIntervaloDeTempoView,
    "gradeHorarioOfertaFormacao" | "intervaloDeTempo"
  >;
  ...PickProperties<
    GradeHorarioOfertaFormacaoIntervaloDeTempoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoInputCreateView {
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInputView;
  intervaloDeTempo: IntervaloDeTempoInputView;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoInputUpdateView
  is OptionalProperties<GradeHorarioOfertaFormacaoIntervaloDeTempoInputCreateView>;

/** Resultados da busca a GradeHorarioOfertaFormacaoIntervaloDeTempos. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoListResultView
  is Pagination.Result.View<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView>;
