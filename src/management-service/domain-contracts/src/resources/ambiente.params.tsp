using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um ambiente. */
model AmbienteView {
  ...OmitProperties<Ambiente, "bloco" | "imagemCapa">;
  bloco: BlocoFindOneOutput;
  imagemCapa: ImagemFindOneOutput | null;
}

/**
 * Dados de entrada para encontrar um ambiente por id.
 */
model AmbienteFindOneInput {
  id: Ambiente.id;
}

/**
 * Visão FindOne de um ambiente.
 */
model AmbienteFindOneOutput {
  //
  ...PickProperties<AmbienteView, "id">;

  ...PickProperties<AmbienteView, "nome">;
  ...PickProperties<AmbienteView, "descricao">;
  ...PickProperties<AmbienteView, "codigo">;
  ...PickProperties<AmbienteView, "capacidade">;
  ...PickProperties<AmbienteView, "tipo">;

  //
  ...PickProperties<AmbienteView, "bloco">;

  ...PickProperties<AmbienteView, "imagemCapa">;

  //
  ...PickProperties<
    AmbienteView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um ambiente. */
model AmbienteCreateInput {
  ...PickProperties<AmbienteView, "nome">;
  ...PickProperties<AmbienteView, "descricao">;
  ...PickProperties<AmbienteView, "codigo">;
  ...PickProperties<AmbienteView, "capacidade">;
  ...PickProperties<AmbienteView, "tipo">;
  bloco: BlocoFindOneInput;
}

/** Dados de entrada para a atualização de um ambiente. */
model AmbienteUpdateInput is AmbienteFindOneInput {
  ...OptionalProperties<AmbienteCreateInput>;
}

/** Dados de entrada para a da busca a ambientes. */
model AmbienteListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`?: Pagination.Input.Filters.eq[];
}

/** Visão da busca a ambientes. */
model AmbienteListOutput is Pagination.Output.View<AmbienteFindOneOutput>;
