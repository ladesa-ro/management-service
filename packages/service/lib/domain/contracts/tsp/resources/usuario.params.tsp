using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um Usuário. */
model UsuarioView {
  ...OmitProperties<Usuario, "imagemCapa" | "imagemPerfil">;
  imagemCapa: ImagemFindOneOutput | null;
  imagemPerfil: ImagemFindOneOutput | null;
}

/** Dados de entrada para encontrar um Usuário por ID. */
model UsuarioFindOneInput {
  id: Usuario.id;
}

/** Visão FindOne de um Usuário. */
model UsuarioFindOneOutput {

  ...PickProperties<UsuarioView, "id">;

  ...PickProperties<UsuarioView, "nome">;
  ...PickProperties<UsuarioView, "matriculaSiape">;
  ...PickProperties<UsuarioView, "email">;
  ...PickProperties<UsuarioView, "isSuperUser">;

  ...PickProperties<UsuarioView, "imagemCapa">;

  ...PickProperties<UsuarioView, "imagemPerfil">;

  ...PickProperties<UsuarioView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

model UsuarioListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a usuários. */
model UsuarioListOutput is Pagination.Output.View<UsuarioFindOneOutput>;

/** Dados de entrada para a criação de um usuário. */
model UsuarioCreateInput {
  ...PickProperties<UsuarioView, "nome">;
  ...PickProperties<UsuarioView, "matriculaSiape">;
  ...PickProperties<UsuarioView, "email">;
}

/** Dados de entrada para a atualização de um Usuário. */
model UsuarioUpdateInput is OptionalProperties<UsuarioCreateInput>;
