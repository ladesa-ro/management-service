using Ladesa.Domain.v4.Generics;

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
model AmbienteUpdateInput is OptionalProperties<AmbienteCreateInput>;

/** Resultados da busca a ambientes. */
model AmbienteListOutput is Pagination.Result.View<AmbienteFindOneOutput>;
