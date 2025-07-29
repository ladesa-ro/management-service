using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um DiaCalendario. */
model DiaCalendarioView {
  ...OmitProperties<DiaCalendario, "calendario">;
  calendario: CalendarioLetivoFindOneOutput;
}

/** Dados de entrada para encontrar um DiaCalendario por ID. */
model DiaCalendarioFindOneInput {
  id: DiaCalendario.id;
}

/** Visão FindOne de um DiaCalendario. */
model DiaCalendarioFindOneOutput {
  ...PickProperties<DiaCalendarioView, "id">;
  ...PickProperties<DiaCalendarioView, "data" | "diaLetivo" | "feriado">;
  ...PickProperties<DiaCalendarioView, "calendario">;
  ...PickProperties<DiaCalendarioView, "diaPresencial" | "Tipo" | "extraCurricular" >;
  ...PickProperties<
    DiaCalendarioView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiaCalendario. */
model DiaCalendarioCreateInput {
  data: date;
  feriado: string|null;
  diaLetivo: boolean;
  calendario: CalendarioLetivoFindOneInput | null;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
}

/** Dados de entrada para a atualização de um DiaCalendario. */
model DiaCalendarioUpdateInput is OptionalProperties<DiaCalendarioCreateInput>;

model DiaCalendarioListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a DiaCalendarios. */
model DiaCalendarioListOutput
  is Pagination.Output.View<DiaCalendarioFindOneOutput>;
