using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** CalendarioLetivo. */
model CalendarioLetivo {
  ...EntityIdUuid;

  /** Nome do calendário letivo. */
  nome: string;

  /** Ano do calendário letivo. */
  ano: uint16;

  /** Campus ao qual o calendário letivo pertence. */
  campus: Campus;

  /** Oferta de formação do calendário letivo. */
  ofertaFormacao: OfertaFormacao;

  ...EntityDated;
}
