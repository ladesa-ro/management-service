using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um Evento. */
model EventoView {
  ...OmitProperties<Evento, "calendario">;
  calendario: CalendarioLetivoFindOneOutput;
}

/** Dados de entrada para encontrar um Evento por ID. */
model EventoFindOneInput {
  id: Evento.id;
}

/** Visão FindOne de um Evento. */
model EventoFindOneOutput {
  ...PickProperties<EventoView, "id">;
  ...PickProperties<EventoView, "nome" | "rrule" | "cor">;
  ...PickProperties<EventoView, "calendario">;
  ...PickProperties<EventoView, "data_inicio" | "data_fim">;
  ...PickProperties<EventoView, "local">;
  ...PickProperties<EventoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um Evento. */
model EventoCreateInput {
  nome: string | null;
  rrule: string;
  cor: string | null;
  calendario: CalendarioLetivoFindOneInput;
  data_inicio?: utcDateTime;
  data_fim?: utcDateTime;
  local?: string | null;
}

/** Dados de entrada para a atualização de um Evento. */
model EventoUpdateInput is OptionalProperties<EventoCreateInput>;

model EventoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];  
}

/** Resultados da busca a Eventos. */
model EventoListOutput is Pagination.Output.View<EventoFindOneOutput>;
