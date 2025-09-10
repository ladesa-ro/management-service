namespace Ladesa.ManagementService {

model ProfessorIndisponibilidadeView {
  id: string;
  idPerfilFk: string;
  /** dia da semana (0=domingo ... 6=sábado) */
  diaDaSemana: integer;
  /** horário de início da indisponibilidade */
  horaInicio: string;
  /** horário de fim da indisponibilidade */
  horaFim: string;
  motivo: string;

  dateCreated?: string;
  dateUpdated?: string;
  dateDeleted?: string | null;
}

/** Lista todas as indisponibilidades */
model ProfessorIndisponibilidadeListOutput {
  id: string;
  idPerfilFk: string;
  diaDaSemana: integer;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

model ProfessorIndisponibilidadeListInput {
  idPerfilFk: string;
}

/** Lista uma indisponibilidade */
model ProfessorIndisponibilidadeFindOneOutput {
  id: string;
  idPerfilFk: string;
  diaDaSemana: int32;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

model ProfessorIndisponibilidadeFindOneInput {
  id: string;
  idPerfilFk: string;
  diaDaSemana: integer;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

/** Atualiza uma indisponibilidade */
model ProfessorIndisponibilidadeUpdateInput {
  diaDaSemana?: integer;
  horaInicio?: string;
  horaFim?: string;
  motivo?: string;
}

/** Cria uma indisponibilidade */
model ProfessorIndisponibilidadeCreateInput {
  idPerfilFk?: string;
  diaDaSemana: integer;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

model ProfessorIndisponibilidadeCreateOutput {
  idPerfilFk?: string;
  diaDaSemana: integer;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

}
