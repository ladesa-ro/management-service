using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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
model PerfilListOutput is Pagination.Result.View<PerfilFindOneOutput>;

/** Dados de entrada para a alteração de vínculo de um Usuário a um Campus. */
model PerfilUpdateView {
  /** Cargos do usuário no vínculo. */
  cargos: string[];

  campus: CampusFindOneInput;
  usuario: UsuarioFindOneInput;
}
