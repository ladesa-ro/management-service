using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um Vínculo. */
model PerfilView {
  ...OmitProperties<Perfil, "campus" | "usuario">;
  campus: CampusFindOneOutput;
  usuario: UsuarioFindOneOutput;
}

/** Dados de entrada para encontrar um Vínculo por ID. */
model PerfilFindOneInput {
  id: Perfil.id;
}

/** Visão FindOne de um Vínculo. */
model PerfilFindOneOutput {

  ...PickProperties<PerfilView, "id">;

  ...PickProperties<PerfilView, "ativo">;
  ...PickProperties<PerfilView, "cargo">;

  ...PickProperties<PerfilView, "campus">;

  ...PickProperties<PerfilView, "usuario">;

  ...PickProperties<PerfilView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

model PerfilListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Vínculos. */
model PerfilListOutput is Pagination.Output.View<PerfilFindOneOutput>;

/** Dados de entrada para a alteração de vínculo de um Usuário a um Campus. */
model PerfilUpdateInput {
  /** Cargos do usuário no vínculo. */
  cargos: string[];

  campus: CampusFindOneInput;
  usuario: UsuarioFindOneInput;
}
