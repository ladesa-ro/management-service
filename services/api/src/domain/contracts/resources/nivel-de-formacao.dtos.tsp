using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um nível de formação. */
model NivelFormacaoView {
  ...NivelFormacao;
}

/** Dados de entrada para encontrar um nível de formação por ID. */
model NivelFormacaoFindOneInput {
  id: NivelFormacao.id;
}

/** Visão FindOne de um nível de formação. */
model NivelFormacaoFindOneOutput {
  ...PickProperties<NivelFormacaoView, "id">;
  ...PickProperties<NivelFormacaoView, "slug">;
  ...PickProperties<
    NivelFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um nível de formação. */
model NivelFormacaoCreateInput {
  ...PickProperties<NivelFormacaoView, "slug">;
}

/** Dados de entrada para a atualização de um nível de formação. */
model NivelFormacaoUpdateInput is OptionalProperties<NivelFormacaoCreateInput>;

/** Resultados da busca aos níveis de formações. */
model NivelFormacaoListOutput
  is Pagination.Result.View<NivelFormacaoFindOneOutput>;
