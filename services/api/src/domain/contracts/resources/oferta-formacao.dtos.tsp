using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma oferta de formação. */
model OfertaFormacaoView {
  ...OmitProperties<
    OfertaFormacao,
    "modalidade" | "ofertaFormacaoNiveisFormacoes"
  >;

  /** Modalidade da oferta de formação. */
  modalidade: ModalidadeFindOneOutput;

  /** Array de relações entre a oferta e níveis de formações. */
  ofertaFormacaoNiveisFormacoes: OfertaFormacaoNivelFormacao[];

  /** Níveis de formações vinculados */
  niveisFormacoes: NivelFormacao[];
}

/** Dados de entrada para encontrar uma oferta de formação por ID. */
model OfertaFormacaoFindOneInput {
  id: OfertaFormacao.id;
}

/** Visão FindOne de uma oferta de formação. */
model OfertaFormacaoFindOneOutput {
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
model OfertaFormacaoCreateInput {
  ...PickProperties<OfertaFormacaoView, "nome">;
  ...PickProperties<OfertaFormacaoView, "slug">;

  /** Modalidade da oferta de formação. */
  modalidade: ModalidadeFindOneInput;
}

/** Dados de entrada para a atualização de uma oferta de formação. */
model OfertaFormacaoUpdateInput
  is OptionalProperties<OfertaFormacaoCreateInput>;

/** Resultados da busca a OfertaFormacaos. */
model OfertaFormacaoListOutput
  is Pagination.Result.View<OfertaFormacaoFindOneOutput>;
