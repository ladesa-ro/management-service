using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um Evento. */
model EventoView {
  ...OmitProperties<Evento, "calendario">;
  calendario: CalendarioLetivoFindOneResultView;
}

/** Dados de entrada para encontrar um Evento por ID. */
model EventoFindOneInputView {
  id: Evento.id;
}

/** Visão FindOne de um Evento. */
model EventoFindOneResultView {
  ...PickProperties<EventoView, "id">;
  ...PickProperties<EventoView, "nome" | "rrule" | "cor">;
  ...PickProperties<EventoView, "calendario">;
  ...PickProperties<EventoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um Evento. */
model EventoInputCreateView {
  nome: string | null;
  rrule: string;
  cor: string | null;
  calendario: CalendarioLetivoFindOneInputView;
}

/** Dados de entrada para a atualização de um Evento. */
model EventoInputUpdateView is OptionalProperties<EventoInputCreateView>;

/** Resultados da busca a Eventos. */
model EventoListResultView is Pagination.Result.View<EventoFindOneResultView>;
