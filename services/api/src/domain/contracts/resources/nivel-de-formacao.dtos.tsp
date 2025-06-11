using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um nível de formação. */
model NivelFormacaoView {
  ...NivelFormacao;
}

/** Dados de entrada para encontrar um nível de formação por ID. */
model NivelFormacaoFindOneInputView {
  id: NivelFormacao.id;
}

/** Visão FindOne de um nível de formação. */
model NivelFormacaoFindOneResultView {
  ...PickProperties<NivelFormacaoView, "id">;
  ...PickProperties<NivelFormacaoView, "slug">;
  ...PickProperties<
    NivelFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um nível de formação. */
model NivelFormacaoInputCreateView {
  ...PickProperties<NivelFormacaoView, "slug">;
}

/** Dados de entrada para a atualização de um nível de formação. */
model NivelFormacaoInputUpdateView
  is OptionalProperties<NivelFormacaoInputCreateView>;

/** Resultados da busca aos níveis de formações. */
model NivelFormacaoListResultView
  is Pagination.Result.View<NivelFormacaoFindOneResultView>;
