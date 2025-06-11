using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** GradeHorarioOfertaFormacao. */
model GradeHorarioOfertaFormacao {
  ...EntityIdUuid;

  /** Campus. */
  campus: Campus;

  /** Oferta de formação. */
  ofertaFormacao: OfertaFormacao;

  ...EntityDated;
}

/** Visão completa de uma oferta de formação. */
model GradeHorarioOfertaFormacaoView {
  ...OmitProperties<GradeHorarioOfertaFormacao, "campus" | "ofertaFormacao">;
  campus: CampusFindOneResultView;
  ofertaFormacao: OfertaFormacaoFindOneResultView;
}
