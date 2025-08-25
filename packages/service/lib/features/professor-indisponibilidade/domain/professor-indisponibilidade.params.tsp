using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Parâmetros de Indisponibilidade de Professor. */
model ProfessorIndisponibilidadeView {
  id: string;
  id_perfil_fk: string;
  indisponibilidade_inicio: utcDateTime;
  indisponibilidade_termino: utcDateTime; 
  motivo: string;
  date_created?: string;
  date_updated?: string;
  date_deleted?: string | null;
}

/** */
model ProfessorIndisponibilidadeListOutput {
  items: ProfessorIndisponibilidade[];
  total?: integer;
}

model ProfessorIndisponibilidadeFindOneOutput {
  item: ProfessorIndisponibilidade;
}

model ProfessorIndisponibilidadeCreateInput {
  indisponibilidade_inicio: string;
  indisponibilidade_termino: string;
  motivo: string;
}

model ProfessorIndisponibilidadeUpdateInput {
  indisponibilidade_inicio?: string;
  indisponibilidade_termino?: string;
  motivo?: string;
}
