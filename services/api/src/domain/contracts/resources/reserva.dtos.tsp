using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Reserva. */
model ReservaView {
  ...OmitProperties<Reserva, "usuario" | "ambiente">;
  usuario: UsuarioFindOneResultView;
  ambiente: AmbienteFindOneResultView;
}

/** Dados de entrada para encontrar uma Reserva por ID. */
model ReservaFindOneInputView {
  id: Reserva.id;
}

/** Visão FindOne de uma Reserva. */
model ReservaFindOneResultView {
  //
  ...PickProperties<ReservaView, "id">;

  ...PickProperties<ReservaView, "situacao" | "motivo" | "tipo" | "rrule">;

  //
  ...PickProperties<ReservaView, "usuario" | "ambiente">;

  //
  ...PickProperties<ReservaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Reserva. */
model ReservaInputCreateView {
  ...PickProperties<ReservaView, "situacao" | "motivo" | "tipo" | "rrule">;
  usuario: UsuarioFindOneInputView;
  ambiente: AmbienteFindOneInputView;
}

/** Dados de entrada para a atualização de uma Reserva. */
model ReservaInputUpdateView is OptionalProperties<ReservaInputCreateView>;

/** Resultados da busca a Reservas. */
model ReservaListResultView is Pagination.Result.View<ReservaFindOneResultView>;
