using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoView {
  ...OmitProperties<
    OfertaFormacaoNivelFormacao,
    "ofertaFormacao" | "nivelFormacao"
  >;
  ofertaFormacao: OfertaFormacaoFindOneOutput;
  nivelFormacao: NivelFormacaoFindOneOutput;
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model OfertaFormacaoNivelFormacaoFindOneInput {
  id: OfertaFormacaoNivelFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoFindOneOutput {
  ...PickProperties<OfertaFormacaoNivelFormacaoView, "id">;
  ...PickProperties<
    OfertaFormacaoNivelFormacaoView,
    "ofertaFormacao" | "nivelFormacao"
  >;
  ...PickProperties<
    OfertaFormacaoNivelFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoCreateInput {
  ofertaFormacao: OfertaFormacaoFindOneInput;
  nivelFormacao: NivelFormacaoFindOneInput;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoUpdateInput
  is OptionalProperties<OfertaFormacaoNivelFormacaoCreateInput>;

/** Resultados da busca a OfertaFormacaoNivelFormacaos. */
model OfertaFormacaoNivelFormacaoListOutput
  is Pagination.Result.View<OfertaFormacaoNivelFormacaoFindOneOutput>;
