using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de um HorarioGeradoAula. */
model HorarioGeradoAulaView {
  ...OmitProperties<
    HorarioGeradoAula,
    "intervaloDeTempo" | "diarioProfessor" | "horarioGerado"
  >;
  intervaloDeTempo: IntervaloDeTempoFindOneOutput;
  diarioProfessor: DiarioProfessorFindOneOutput;
  horarioGerado: HorarioGeradoFindOneOutput;
}

/** Dados de entrada para encontrar um HorarioGeradoAula por ID. */
model HorarioGeradoAulaFindOneInput {
  id: HorarioGeradoAula.id;
}

/** Visão FindOne de um HorarioGeradoAula. */
model HorarioGeradoAulaFindOneOutput {
  ...PickProperties<HorarioGeradoAulaView, "id" | "data">;
  ...PickProperties<
    HorarioGeradoAulaView,
    "intervaloDeTempo" | "diarioProfessor" | "horarioGerado"
  >;
  ...PickProperties<
    HorarioGeradoAulaView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um HorarioGeradoAula. */
model HorarioGeradoAulaCreateInput {
  data: HorarioGeradoAula.data;
  intervaloDeTempo: IntervaloDeTempoInput;
  diarioProfessor: DiarioProfessorFindOneInput;
  horarioGerado: HorarioGeradoFindOneInput;
}

/** Dados de entrada para a atualização de um HorarioGeradoAula. */
model HorarioGeradoAulaUpdateInput
  is OptionalProperties<HorarioGeradoAulaCreateInput>;

model HorarioGeradoAulaListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca de HorarioGeradoAulas. */
model HorarioGeradoAulaListOutput
  is Pagination.Output.View<HorarioGeradoAulaFindOneOutput>;
