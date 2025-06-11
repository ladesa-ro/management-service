using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoView {
  ...OmitProperties<
    OfertaFormacaoNivelFormacao,
    "ofertaFormacao" | "nivelFormacao"
  >;
  ofertaFormacao: OfertaFormacaoFindOneResultView;
  nivelFormacao: NivelFormacaoFindOneResultView;
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model OfertaFormacaoNivelFormacaoFindOneInputView {
  id: OfertaFormacaoNivelFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoFindOneResultView {
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
model OfertaFormacaoNivelFormacaoInputCreateView {
  ofertaFormacao: OfertaFormacaoFindOneInputView;
  nivelFormacao: NivelFormacaoFindOneInputView;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model OfertaFormacaoNivelFormacaoInputUpdateView
  is OptionalProperties<OfertaFormacaoNivelFormacaoInputCreateView>;

/** Resultados da busca a OfertaFormacaoNivelFormacaos. */
model OfertaFormacaoNivelFormacaoListResultView
  is Pagination.Result.View<OfertaFormacaoNivelFormacaoFindOneResultView>;
