using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Parâmetros de Indisponibilidade de Professor. */
model ProfessorIndisponibilidadeView {
  /** UUID */
  id: string;
  /** FK para o perfil do professor*/
  id_perfil_fk: string;
  /** inico da indisponibilidade */
  indisponibilidade_inicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidade_termino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
  
  /** Coiso do banco de dados GESTAO */
  date_created?: string;
  date_updated?: string;
  date_deleted?: string | null;
}

/** Lista todas as indisponibilidades*/
model ProfessorIndisponibilidadeListOutput {
    /** UUID */
  id: string;
  /** FK para o perfil do professor*/
  id_perfil_fk: string;
  /** inico da indisponibilidade */
  indisponibilidade_inicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidade_termino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}
model ProfessorIndisponibilidadeListInput {
  id_perfil_fk: string;
}


/**Lista uma indisponibilidade*/
model ProfessorIndisponibilidadeFindOneOutput {
  id: string;
  /** FK para o perfil do professor*/
  id_perfil_fk: string;
  /** inico da indisponibilidade */
  indisponibilidade_inicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidade_termino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}
model ProfessorIndisponibilidadeFindOneInput {
  id: string;
  /** FK para o perfil do professor*/
  id_perfil_fk: string;
  /** inico da indisponibilidade */
  indisponibilidade_inicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidade_termino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}

/** Atualiza uma indisponibilidade*/
model ProfessorIndisponibilidadeUpdateInput {
  indisponibilidade_inicio?: string;
  indisponibilidade_termino?: string;
  motivo?: string;
}


model ProfessorIndisponibilidadeCreateOutput {
  id_perfil_fk?: string;
  indisponibilidade_inicio: string;
  indisponibilidade_termino: string;
  motivo: string;
}
/** Cria uma indisponibilidade*/
model ProfessorIndisponibilidadeCreateInput {
  id_perfil_fk?: string;
  indisponibilidade_inicio: string;
  indisponibilidade_termino: string;
  motivo: string;
}








