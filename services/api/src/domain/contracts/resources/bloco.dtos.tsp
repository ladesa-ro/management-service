using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um bloco. */
model BlocoView {
  ...OmitProperties<Bloco, "campus" | "ambientes" | "imagemCapa">;
  campus: CampusFindOneResultView;
  imagemCapa: ImagemFindOneResultView | null;
  ambientes: AmbienteFindOneResultView[];
}

/**
 * Dados de entrada para encontrar um bloco por id.
 */
model BlocoFindOneInputView {
  id: Bloco.id;
}

/**
 * Visão FindOne de um bloco.
 */
model BlocoFindOneResultView {
  //
  ...PickProperties<BlocoView, "id">;

  ...PickProperties<BlocoView, "nome">;
  ...PickProperties<BlocoView, "codigo">;

  //
  ...PickProperties<BlocoView, "campus">;

  ...PickProperties<BlocoView, "imagemCapa">;

  //
  ...PickProperties<BlocoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um bloco. */
model BlocoInputCreateView {
  ...PickProperties<BlocoView, "nome">;
  ...PickProperties<BlocoView, "codigo">;
  campus: CampusFindOneInputView;
}

/** Dados de entrada para a atualização de um bloco. */
model BlocoInputUpdateView is OptionalProperties<BlocoInputCreateView>;

/** Resultados da busca a blocos. */
model BlocoListResultView is Pagination.Result.View<BlocoFindOneResultView>;
