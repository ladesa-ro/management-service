using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma modalidade. */
model ModalidadeView {
  ...Modalidade;
}

/** Dados de entrada para encontrar uma modalidade por ID. */
model ModalidadeFindOneInputView {
  id: Modalidade.id;
}

/** Visão FindOne de uma modalidade. */
model ModalidadeFindOneResultView {
  ...PickProperties<ModalidadeView, "id">;
  ...PickProperties<ModalidadeView, "slug">;
  ...PickProperties<
    ModalidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma modalidade. */
model ModalidadeInputCreateView {
  ...PickProperties<ModalidadeView, "slug">;
}

/** Dados de entrada para a atualização de uma modalidade. */
model ModalidadeInputUpdateView
  is OptionalProperties<ModalidadeInputCreateView>;

/** Resultados da busca a Modalidades. */
model ModalidadeListResultView
  is Pagination.Result.View<ModalidadeFindOneResultView>;
