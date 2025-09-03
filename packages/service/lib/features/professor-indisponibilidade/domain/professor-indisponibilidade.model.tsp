using Ladesa.ManagementService.Generics;
namespace Ladesa.ManagementService;

model ProfessorIndisponibilidade{
  ...EntityIdUuid;

  /** Id do perfil*/
  perfil : Perfil;

  /** Horario de inicio*/
  indisponibilidadeInicio : utcDateTime;

  /** Dias da semana que o professor esta indisponivel */
  segunda : time;
  
  terca : time;
  
  quarta : time;
  
  quinta : time;
  
  sexta : time;
  
  sabado : time;

  domingo : time;

  // ============================================================================

  /** Horario de termino*/
  indisponibilidadeTermino : utcDateTime;

  /** Breve descricao do motivo de indisponibilidade*/
  motivo : string;

  ...EntityDated;
}

