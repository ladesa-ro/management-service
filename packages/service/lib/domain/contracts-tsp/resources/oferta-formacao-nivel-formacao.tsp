using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** OfertaFormacaoNivelFormacao. */
model OfertaFormacaoNivelFormacao {
  ...EntityIdUuid;

  /** Oferta de formação. */
  ofertaFormacao: OfertaFormacao;

  /** Nível de formação. */
  nivelFormacao: NivelFormacao;

  ...EntityDated;
}
