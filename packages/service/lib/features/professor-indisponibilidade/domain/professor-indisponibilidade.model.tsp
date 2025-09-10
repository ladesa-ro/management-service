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

