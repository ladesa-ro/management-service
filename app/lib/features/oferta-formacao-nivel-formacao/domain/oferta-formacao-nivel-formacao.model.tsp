using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** OfertaFormacaoNivelFormacao. */
model OfertaFormacaoNivelFormacao {
  ...EntityIdUuid;

  /** Oferta de formação. */
  ofertaFormacao: OfertaFormacao;

  /** Nível de formação. */
  nivelFormacao: NivelFormacao;

  ...EntityDated;
}
