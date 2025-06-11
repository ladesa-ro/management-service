using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um DisponibilidadeDia. */
model DisponibilidadeDiaView {
  ...OmitProperties<DisponibilidadeDia, "intervaloDeTempo" | "disponibilidade">;
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;
  disponibilidade: DisponibilidadeFindOneResultView;
}

/** Dados de entrada para encontrar um DisponibilidadeDia por ID. */
model DisponibilidadeDiaFindOneInputView {
  id: DisponibilidadeDia.id;
}

/** Visão FindOne de um DisponibilidadeDia. */
model DisponibilidadeDiaFindOneResultView {
  ...PickProperties<DisponibilidadeDiaView, "id">;
  ...PickProperties<DisponibilidadeDiaView, "rrule">;
  ...PickProperties<
    DisponibilidadeDiaView,
    "intervaloDeTempo" | "disponibilidade"
  >;
  ...PickProperties<
    DisponibilidadeDiaView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DisponibilidadeDia. */
model DisponibilidadeDiaInputCreateView {
  rrule: DisponibilidadeDia.rrule;
  intervaloDeTempo: IntervaloDeTempoInputView;
  disponibilidade: DisponibilidadeFindOneInputView;
}

/** Dados de entrada para a atualização de um DisponibilidadeDia. */
model DisponibilidadeDiaInputUpdateView
  is OptionalProperties<DisponibilidadeDiaInputCreateView>;

/** Resultados da busca a DisponibilidadeDia. */
model DisponibilidadeDiaListResultView
  is Pagination.Result.View<DisponibilidadeDiaFindOneResultView>;
