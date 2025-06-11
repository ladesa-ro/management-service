using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um Usuário. */
model UsuarioView {
  ...OmitProperties<Usuario, "imagemCapa" | "imagemPerfil">;
  imagemCapa: ImagemFindOneResultView | null;
  imagemPerfil: ImagemFindOneResultView | null;
}

/** Dados de entrada para encontrar um Usuário por ID. */
model UsuarioFindOneInputView {
  id: Usuario.id;
}

/** Visão FindOne de um Usuário. */
model UsuarioFindOneResultView {
  //
  ...PickProperties<UsuarioView, "id">;

  ...PickProperties<UsuarioView, "nome">;
  ...PickProperties<UsuarioView, "matriculaSiape">;
  ...PickProperties<UsuarioView, "email">;
  ...PickProperties<UsuarioView, "isSuperUser">;

  //
  ...PickProperties<UsuarioView, "imagemCapa">;

  //
  ...PickProperties<UsuarioView, "imagemPerfil">;

  //
  ...PickProperties<UsuarioView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Resultados da busca a usuários. */
model UsuarioListResultView is Pagination.Result.View<UsuarioFindOneResultView>;

/** Dados de entrada para a criação de um usuário. */
model UsuarioInputCreateView {
  ...PickProperties<UsuarioView, "nome">;
  ...PickProperties<UsuarioView, "matriculaSiape">;
  ...PickProperties<UsuarioView, "email">;
}

/** Dados de entrada para a atualização de um Usuário. */
model UsuarioInputUpdateView is OptionalProperties<UsuarioInputCreateView>;
