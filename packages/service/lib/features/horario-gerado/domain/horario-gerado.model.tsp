using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** HorarioGerado. */
model HorarioGerado {
  ...EntityIdUuid;

  /** Status do horário gerado. */
  status: string | null;

  /** Tipo do horário gerado. */
  tipo: string | null;

  /** Data em que o horário foi gerado. */
  dataGeracao: date_time | null;

  /** Início da vigência do horário gerado. */
  vigenciaInicio: date | null;

  /** Fim da vigência do horário gerado. */
  vigenciaFim: date | null;

  /** calendário. */
  calendario: CalendarioLetivo;

  ...EntityDated;
}
