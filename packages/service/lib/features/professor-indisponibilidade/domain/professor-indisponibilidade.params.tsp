using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Parâmetros de Indisponibilidade de Professor. */
model ProfessorIndisponibilidadeView {
  /** UUID */
  id: string;
  /** FK para o perfil do professor*/
  idPerfilFk: string;
  /** inico da indisponibilidade */
  indisponibilidadeInicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidadeTermino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
  
  /** Coiso do banco de dados GESTAO */
  dateCreated?: string;
  dateUpdated?: string;
  dateDeleted?: string | null;
}

/** Lista todas as indisponibilidades*/
model ProfessorIndisponibilidadeListOutput {
    /** UUID */
  id: string;
  /** FK para o perfil do professor*/
  idPerfilFk: string;
  /** inico da indisponibilidade */
  indisponibilidadeInicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidadeTermino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}
model ProfessorIndisponibilidadeListInput {
  idPerfilFk: string;
}


/**Lista uma indisponibilidade*/
model ProfessorIndisponibilidadeFindOneOutput {
  id: string;
  /** FK para o perfil do professor*/
  idPerfilFk: string;
  /** inico da indisponibilidade */
  indisponibilidadeInicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidadeTermino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}
model ProfessorIndisponibilidadeFindOneInput {
  id: string;
  /** FK para o perfil do professor*/
  idPerfilFk: string;
  /** inico da indisponibilidade */
  indisponibilidadeInicio: utcDateTime;
  /**termino da indisponibilidade */
  indisponibilidadeTermino: utcDateTime;
  /**motivo da indisponibilidade */
  motivo: string;
}

/** Atualiza uma indisponibilidade*/
model ProfessorIndisponibilidadeUpdateInput {
  indisponibilidadeInicio?: string;
  indisponibilidadeTermino?: string;
  motivo?: string;
}


model ProfessorIndisponibilidadeCreateOutput {
  idPerfilFk?: string;
  indisponibilidadeInicio: string;
  indisponibilidadeTermino: string;
  motivo: string;
}
/** Cria uma indisponibilidade*/
model ProfessorIndisponibilidadeCreateInput {
  idPerfilFk?: string;
  indisponibilidadeInicio: string;
  indisponibilidadeTermino: string;
  motivo: string;
}








