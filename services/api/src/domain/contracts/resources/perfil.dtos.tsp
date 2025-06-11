using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um Vínculo. */
model PerfilView {
  ...OmitProperties<Perfil, "campus" | "usuario">;
  campus: CampusFindOneResultView;
  usuario: UsuarioFindOneResultView;
}

/** Dados de entrada para encontrar um Vínculo por ID. */
model PerfilFindOneInputView {
  id: Perfil.id;
}

/** Visão FindOne de um Vínculo. */
model PerfilFindOneResultView {
  //
  ...PickProperties<PerfilView, "id">;

  ...PickProperties<PerfilView, "ativo">;
  ...PickProperties<PerfilView, "cargo">;

  //
  ...PickProperties<PerfilView, "campus">;

  //
  ...PickProperties<PerfilView, "usuario">;

  //
  ...PickProperties<PerfilView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Resultados da busca a Vínculos. */
model PerfilListResultView is Pagination.Result.View<PerfilFindOneResultView>;

/** Dados de entrada para a alteração de vínculo de um Usuário a um Campus. */
model PerfilUpdateView {
  /** Cargos do usuário no vínculo. */
  cargos: string[];

  campus: CampusFindOneInputView;
  usuario: UsuarioFindOneInputView;
}
