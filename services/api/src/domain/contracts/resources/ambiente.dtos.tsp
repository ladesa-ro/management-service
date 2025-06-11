using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um ambiente. */
model AmbienteView {
  ...OmitProperties<Ambiente, "bloco" | "imagemCapa">;
  bloco: BlocoFindOneResultView;
  imagemCapa: ImagemFindOneResultView | null;
}

/**
 * Dados de entrada para encontrar um ambiente por id.
 */
model AmbienteFindOneInputView {
  id: Ambiente.id;
}

/**
 * Visão FindOne de um ambiente.
 */
model AmbienteFindOneResultView {
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
model AmbienteInputCreateView {
  ...PickProperties<AmbienteView, "nome">;
  ...PickProperties<AmbienteView, "descricao">;
  ...PickProperties<AmbienteView, "codigo">;
  ...PickProperties<AmbienteView, "capacidade">;
  ...PickProperties<AmbienteView, "tipo">;
  bloco: BlocoFindOneInputView;
}

/** Dados de entrada para a atualização de um ambiente. */
model AmbienteInputUpdateView is OptionalProperties<AmbienteInputCreateView>;

/** Resultados da busca a ambientes. */
model AmbienteListResultView
  is Pagination.Result.View<AmbienteFindOneResultView>;
