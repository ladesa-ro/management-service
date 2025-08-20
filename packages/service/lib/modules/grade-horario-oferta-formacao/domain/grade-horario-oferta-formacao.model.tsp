using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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
