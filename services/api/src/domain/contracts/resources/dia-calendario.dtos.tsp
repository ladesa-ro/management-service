using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um DiaCalendario. */
model DiaCalendarioView {
  ...OmitProperties<DiaCalendario, "calendario">;
  calendario: CalendarioLetivoFindOneResultView;
}

/** Dados de entrada para encontrar um DiaCalendario por ID. */
model DiaCalendarioFindOneInputView {
  id: DiaCalendario.id;
}

/** Visão FindOne de um DiaCalendario. */
model DiaCalendarioFindOneResultView {
  ...PickProperties<DiaCalendarioView, "id">;
  ...PickProperties<DiaCalendarioView, "data" | "diaLetivo" | "feriado">;
  ...PickProperties<DiaCalendarioView, "calendario">;
  ...PickProperties<
    DiaCalendarioView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiaCalendario. */
model DiaCalendarioInputCreateView {
  data: date;
  feriado: boolean;
  diaLetivo: boolean;
  calendario: CalendarioLetivoFindOneInputView | null;
}

/** Dados de entrada para a atualização de um DiaCalendario. */
model DiaCalendarioInputUpdateView
  is OptionalProperties<DiaCalendarioInputCreateView>;

/** Resultados da busca a DiaCalendarios. */
model DiaCalendarioListResultView
  is Pagination.Result.View<DiaCalendarioFindOneResultView>;
