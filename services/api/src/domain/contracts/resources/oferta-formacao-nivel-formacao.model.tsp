using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** OfertaFormacaoNivelFormacao. */
model OfertaFormacaoNivelFormacao {
  ...EntityIdUuid;

  /** Oferta de formação. */
  ofertaFormacao: OfertaFormacao;

  /** Nível de formação. */
  nivelFormacao: NivelFormacao;

  ...EntityDated;
}
