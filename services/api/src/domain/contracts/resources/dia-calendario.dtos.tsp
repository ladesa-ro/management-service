using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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
  ...PickProperties<
    DiaCalendarioView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiaCalendario. */
model DiaCalendarioCreateInput {
  data: date;
  feriado: boolean;
  diaLetivo: boolean;
  calendario: CalendarioLetivoFindOneInput | null;
}

/** Dados de entrada para a atualização de um DiaCalendario. */
model DiaCalendarioUpdateInput is OptionalProperties<DiaCalendarioCreateInput>;

/** Resultados da busca a DiaCalendarios. */
model DiaCalendarioListOutput
  is Pagination.Result.View<DiaCalendarioFindOneOutput>;
