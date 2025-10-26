using Ladesa.ManagementService.Generics;
namespace Ladesa.ManagementService;

model ProfessorIndisponibilidade{
  ...EntityIdUuid;

  /** Id do perfil*/
  perfil : Perfil;

  /**diaDaSemana vai de 0 á 6 0 = domingo e sucessivamente até 6 = sabado */
  diaDaSemana: int8;
  
  /** Hora de inicio da indisponibilidade */
  horaInicio: time;
  
  /** Hora de termino da indisponibilidade */
  horaFim: time;
  
  // ============================================================================

  /** Breve descricao do motivo de indisponibilidade*/
  motivo : string;

  ...EntityDated;
}

model ProfessorIndisponibilidadeRRuleView {
  /** id da indisponibilidade (uuid) */
  @format("uuid")
  id: string;

  /** id do perfil (uuid) */
  @format("uuid")
  id_perfil_fk: string;

  /** string RRULE + possível DTSTART (ex: "DTSTART:20251025T080000\nRRULE:FREQ=WEEKLY;BYDAY=MO") */
  rrule: string;

  /** horário de início (formato: YYYY-MM-DD hh:mm:ss ou time-string conforme seu padrão) */
  hora_inicio: string;

  /** horário de fim (pode ser null se não houver) */
  hora_fim?: string | null;
}

