using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma Reserva. */
model ReservaView {
  ...OmitProperties<Reserva, "usuario" | "ambiente">;
  usuario: UsuarioFindOneOutput;
  ambiente: AmbienteFindOneOutput;
}

/** Dados de entrada para encontrar uma Reserva por ID. */
model ReservaFindOneInput {
  id: Reserva.id;
}

/** Visão FindOne de uma Reserva. */
model ReservaFindOneOutput {

  ...PickProperties<ReservaView, "id">;

  ...PickProperties<ReservaView, "situacao" | "motivo" | "tipo" | "rrule">;

  ...PickProperties<ReservaView, "usuario" | "ambiente">;

  ...PickProperties<ReservaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Reserva. */
model ReservaCreateInput {
  ...PickProperties<ReservaView, "situacao" | "motivo" | "tipo" | "rrule">;
  usuario: UsuarioFindOneInput;
  ambiente: AmbienteFindOneInput;
}

/** Dados de entrada para a atualização de uma Reserva. */
model ReservaUpdateInput is OptionalProperties<ReservaCreateInput>;

model ReservaListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Reservas. */
model ReservaListOutput is Pagination.Output.View<ReservaFindOneOutput>;
