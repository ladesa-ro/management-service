using Ladesa.ManagementService.Generics;
namespace Ladesa.ManagementService;

model ProfessorIndisponibilidade{
  ...EntityIdUuid;

  /** Id do perfil*/
  perfil : Perfil;

  /** Horario de inicio*/
  indisponibilidade_inicio : utcDateTime;

  /** Horario de termino*/
  indisponibilidade_termino : utcDateTime;

  /** Breve descricao do motivo de indisponibilidade*/
  motivo : string;

  ...EntityDated;
}

