using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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
