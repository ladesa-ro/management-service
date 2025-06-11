using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** OfertaFormacao. */
model OfertaFormacao {
  ...EntityIdUuid;

  /** Nome da oferta de formação. */
  @minLength(1)
  nome: string;

  /** Apelido da oferta de formação. */
  @minLength(1)
  slug: string;

  /** Modalidade da oferta de formação. */
  modalidade: Modalidade;

  /** Array de relações entre a oferta e níveis de formações. */
  ofertaFormacaoNiveisFormacoes: OfertaFormacaoNivelFormacao[];

  ...EntityDated;
}
