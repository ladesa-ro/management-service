using Ladesa.ManagementService.Generics;
namespace Ladesa.ManagementService;

model ProfessorIndisponibilidade{
  ...EntityIdUuid;

  /** Id do perfil*/
  perfil : Perfil;

  /** Horario de inicio*/
  indisponibilidadeInicio : utcDateTime;

  /** Horario de termino*/
  indisponibilidadeTermino : utcDateTime;

  /** Breve descricao do motivo de indisponibilidade*/
  motivo : string;

  ...EntityDated;
}

