using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma oferta de formação. */
model OfertaFormacaoView {
  ...OmitProperties<
    OfertaFormacao,
    "modalidade" | "ofertaFormacaoNiveisFormacoes"
  >;

  /** Modalidade da oferta de formação. */
  modalidade: ModalidadeFindOneResultView;

  /** Array de relações entre a oferta e níveis de formações. */
  ofertaFormacaoNiveisFormacoes: OfertaFormacaoNivelFormacao[];

  /** Níveis de formações vinculados */
  niveisFormacoes: NivelFormacao[];
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model OfertaFormacaoFindOneInputView {
  id: OfertaFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model OfertaFormacaoFindOneResultView {
  ...PickProperties<OfertaFormacaoView, "id">;
  ...PickProperties<OfertaFormacaoView, "nome">;
  ...PickProperties<OfertaFormacaoView, "slug">;
  ...PickProperties<OfertaFormacaoView, "modalidade">;
  ...PickProperties<
    OfertaFormacaoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma oferta de formação. */
model OfertaFormacaoInputCreateView {
  ...PickProperties<OfertaFormacaoView, "nome">;
  ...PickProperties<OfertaFormacaoView, "slug">;

  /** Modalidade da oferta de formação. */
  modalidade: ModalidadeFindOneInputView;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model OfertaFormacaoInputUpdateView
  is OptionalProperties<OfertaFormacaoInputCreateView>;

/** Resultados da busca a OfertaFormacaos. */
model OfertaFormacaoListResultView
  is Pagination.Result.View<OfertaFormacaoFindOneResultView>;
