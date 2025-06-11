using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um HorarioGeradoAula. */
model HorarioGeradoAulaView {
  ...OmitProperties<
    HorarioGeradoAula,
    "intervaloDeTempo" | "diarioProfessor" | "horarioGerado"
  >;
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;
  diarioProfessor: DiarioProfessorFindOneResultView;
  horarioGerado: HorarioGeradoFindOneResultView;
}

/** Dados de entrada para encontrar um HorarioGeradoAula por ID. */
model HorarioGeradoAulaFindOneInputView {
  id: HorarioGeradoAula.id;
}

/** Visão FindOne de um HorarioGeradoAula. */
model HorarioGeradoAulaFindOneResultView {
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
model HorarioGeradoAulaInputCreateView {
  data: HorarioGeradoAula.data;
  intervaloDeTempo: IntervaloDeTempoInputView;
  diarioProfessor: DiarioProfessorFindOneInputView;
  horarioGerado: HorarioGeradoFindOneInputView;
}

/** Dados de entrada para a atualização de um HorarioGeradoAula. */
model HorarioGeradoAulaInputUpdateView
  is OptionalProperties<HorarioGeradoAulaInputCreateView>;

/** Resultados da busca de HorarioGeradoAulas. */
model HorarioGeradoAulaListResultView
  is Pagination.Result.View<HorarioGeradoAulaFindOneResultView>;
