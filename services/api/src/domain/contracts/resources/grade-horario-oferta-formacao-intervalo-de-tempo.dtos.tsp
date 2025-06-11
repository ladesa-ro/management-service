using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;
using Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoView {
  ...OmitProperties<
    GradeHorarioOfertaFormacaoIntervaloDeTempo,
    "gradeHorarioOfertaFormacao" | "intervaloDeTempo"
  >;
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneOutput;
  intervaloDeTempo: IntervaloDeTempoFindOneOutput;
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput {
  id: GradeHorarioOfertaFormacaoIntervaloDeTempo.id;
}

/** Visão FindOne de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput {
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
model GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput {
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInput;
  intervaloDeTempo: IntervaloDeTempoInput;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput
  is OptionalProperties<GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput>;

/** Resultados da busca a GradeHorarioOfertaFormacaoIntervaloDeTempos. */
model GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput
  is Pagination.Result.View<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput>;
