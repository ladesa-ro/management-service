using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

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
  campus: CampusFindOneOutput;
  ofertaFormacao: OfertaFormacaoFindOneOutput;
}
