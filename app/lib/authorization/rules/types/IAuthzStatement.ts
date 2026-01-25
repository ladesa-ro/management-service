import { IBaseAuthzCheck, IBaseAuthzFilter } from "./IBaseAuthz";

// Generic DTO input type for authorization - accepts any object shape
// Using 'object' instead of Record to avoid index signature requirement
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DtoInput = {};

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<"endereco:find">;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<"estado:find">;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<"cidade:find">;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<
  "campus:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<
  "campus:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<
  "campus:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<
  "bloco:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<
  "bloco:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<
  "bloco:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<
  "ambiente:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<
  "ambiente:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<
  "ambiente:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<
  "usuario:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<
  "usuario:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<
  "usuario:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementNivelFormacaoCreate = IBaseAuthzCheck<
  "nivel_formacao:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementNivelFormacaoFind = IBaseAuthzFilter<"nivel_formacao:find">;
export type IAuthzStatementNivelFormacaoUpdate = IBaseAuthzFilter<
  "nivel_formacao:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementNivelFormacaoDelete = IBaseAuthzFilter<
  "nivel_formacao:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<
  "modalidade:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<
  "modalidade:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<
  "modalidade:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoNivelFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao_nivel_formacao:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoFind = IBaseAuthzFilter<"oferta_formacao_nivel_formacao:find">;

export type IAuthzStatementOfertaFormacaoNivelFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementOfertaFormacaoFind = IBaseAuthzFilter<"oferta_formacao:find">;
export type IAuthzStatementOfertaFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementOfertaFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<
  "curso:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<
  "curso:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<
  "curso:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<
  "disciplina:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<
  "disciplina:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<
  "disciplina:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<
  "turma:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<
  "turma:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<
  "turma:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<
  "diario:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<
  "diario:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<
  "diario:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<
  "reserva:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<
  "reserva:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<
  "reserva:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<
  "calendario_letivo:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<
  "calendario_letivo:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<
  "calendario_letivo:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao_intervalo_de_tempo:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao_intervalo_de_tempo:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
  {
    dto: DtoInput;
  }
>;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<
  "diario_professor:create",
  {
    dto: DtoInput;
  }
>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<
  "diario_professor:update",
  {
    dto: DtoInput;
  }
>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<
  "diario_professor:delete",
  {
    dto: DtoInput;
  }
>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<
  "evento:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<
  "evento:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<
  "evento:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<
  "dia_calendario:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<
  "dia_calendario:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<
  "dia_calendario:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<
  "etapa:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<
  "etapa:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<
  "etapa:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<
  "aula:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<
  "aula:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<
  "aula:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDisponibilidadeCreate = IBaseAuthzCheck<
  "disponibilidade:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisponibilidadeUpdate = IBaseAuthzFilter<
  "disponibilidade:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisponibilidadeDelete = IBaseAuthzFilter<
  "disponibilidade:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDisponibilidadeFind = IBaseAuthzFilter<"disponibilidade:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeCreate = IBaseAuthzCheck<
  "turma_disponibilidade:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeUpdate = IBaseAuthzFilter<
  "turma_disponibilidade:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeDelete = IBaseAuthzFilter<
  "turma_disponibilidade:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeFind = IBaseAuthzFilter<"turma_disponibilidade:find">;

// =====================

export type IAuthzStatementProfessorDisponibilidadeCreate = IBaseAuthzCheck<
  "professor_disponibilidade:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeUpdate = IBaseAuthzFilter<
  "professor_disponibilidade:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeDelete = IBaseAuthzFilter<
  "professor_disponibilidade:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeFind = IBaseAuthzFilter<"professor_disponibilidade:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<
  "diario_preferencia_agrupamento:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<
  "horario_gerado:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<
  "horario_gerado:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<
  "horario_gerado:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<
  "horario_gerado_aula:create",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<
  "horario_gerado_aula:update",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<
  "horario_gerado_aula:delete",
  {
    dto: DtoInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaFind = IBaseAuthzFilter<"horario_gerado_aula:find">;

// ===================================================================================

export type IAuthzStatementCheck =
  | IAuthzStatementCampusCreate
  | IAuthzStatementBlocoCreate
  | IAuthzStatementAmbienteCreate
  | IAuthzStatementUsuarioCreate
  | IAuthzStatementNivelFormacaoCreate
  | IAuthzStatementModalidadeCreate
  | IAuthzStatementOfertaFormacaoCreate
  | IAuthzStatementOfertaFormacaoNivelFormacaoCreate
  | IAuthzStatementCursoCreate
  | IAuthzStatementDisciplinaCreate
  | IAuthzStatementTurmaCreate
  | IAuthzStatementCalendarioLetivoCreate
  | IAuthzStatementGradeHorarioOfertaFormacaoCreate
  | IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate
  | IAuthzStatementDiarioCreate
  | IAuthzStatementReservaCreate
  | IAuthzStatementDiarioProfessorCreate
  | IAuthzStatementEventoCreate
  | IAuthzStatementDiaCalendarioCreate
  | IAuthzStatementEtapaCreate
  | IAuthzStatementAulaCreate
  | IAuthzStatementDisponibilidadeCreate
  | IAuthzStatementTurmaDisponibilidadeCreate
  | IAuthzStatementProfessorDisponibilidadeCreate
  | IAuthzStatementDiarioPreferenciaAgrupamentoCreate
  | IAuthzStatementHorarioGeradoCreate
  | IAuthzStatementHorarioGeradoAulaCreate;

// =====================

export type IAuthzStatementFilter =
  | IAuthzStatementEnderecoFind
  | IAuthzStatementEstadoFind
  | IAuthzStatementCidadeFind
  | IAuthzStatementCampusFind
  | IAuthzStatementCampusUpdate
  | IAuthzStatementCampusDelete
  | IAuthzStatementBlocoFind
  | IAuthzStatementBlocoUpdate
  | IAuthzStatementBlocoDelete
  | IAuthzStatementNivelFormacaoFind
  | IAuthzStatementNivelFormacaoUpdate
  | IAuthzStatementNivelFormacaoDelete
  | IAuthzStatementModalidadeFind
  | IAuthzStatementModalidadeUpdate
  | IAuthzStatementModalidadeDelete
  | IAuthzStatementOfertaFormacaoFind
  | IAuthzStatementOfertaFormacaoUpdate
  | IAuthzStatementOfertaFormacaoDelete
  | IAuthzStatementOfertaFormacaoNivelFormacaoFind
  | IAuthzStatementOfertaFormacaoNivelFormacaoUpdate
  | IAuthzStatementOfertaFormacaoNivelFormacaoDelete
  | IAuthzStatementAmbienteFind
  | IAuthzStatementAmbienteUpdate
  | IAuthzStatementAmbienteDelete
  | IAuthzStatementUsuarioFind
  | IAuthzStatementUsuarioUpdate
  | IAuthzStatementUsuarioDelete
  | IAuthzStatementVinculoFind
  | IAuthzStatementCursoDelete
  | IAuthzStatementCursoFind
  | IAuthzStatementCursoUpdate
  | IAuthzStatementDisciplinaUpdate
  | IAuthzStatementDisciplinaDelete
  | IAuthzStatementDisciplinaFind
  | IAuthzStatementTurmaUpdate
  | IAuthzStatementTurmaDelete
  | IAuthzStatementTurmaFind
  | IAuthzStatementDiarioUpdate
  | IAuthzStatementDiarioDelete
  | IAuthzStatementDiarioFind
  | IAuthzStatementReservaUpdate
  | IAuthzStatementReservaDelete
  | IAuthzStatementReservaFind
  | IAuthzStatementCalendarioLetivoDelete
  | IAuthzStatementCalendarioLetivoFind
  | IAuthzStatementCalendarioLetivoUpdate
  | IAuthzStatementGradeHorarioOfertaFormacaoDelete
  | IAuthzStatementGradeHorarioOfertaFormacaoFind
  | IAuthzStatementGradeHorarioOfertaFormacaoUpdate
  | IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete
  | IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind
  | IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate
  | IAuthzStatementDiarioProfessorUpdate
  | IAuthzStatementDiarioProfessorDelete
  | IAuthzStatementDiarioProfessorFilter
  | IAuthzStatementEventoFind
  | IAuthzStatementEventoUpdate
  | IAuthzStatementEventoDelete
  | IAuthzStatementDiaCalendarioFind
  | IAuthzStatementDiaCalendarioUpdate
  | IAuthzStatementDiaCalendarioDelete
  | IAuthzStatementEtapaUpdate
  | IAuthzStatementEtapaFind
  | IAuthzStatementEtapaDelete
  | IAuthzStatementAulaUpdate
  | IAuthzStatementAulaDelete
  | IAuthzStatementAulaFind
  | IAuthzStatementDisponibilidadeUpdate
  | IAuthzStatementDisponibilidadeFind
  | IAuthzStatementDisponibilidadeDelete
  | IAuthzStatementTurmaDisponibilidadeUpdate
  | IAuthzStatementTurmaDisponibilidadeFind
  | IAuthzStatementTurmaDisponibilidadeDelete
  | IAuthzStatementProfessorDisponibilidadeUpdate
  | IAuthzStatementProfessorDisponibilidadeFind
  | IAuthzStatementProfessorDisponibilidadeDelete
  | IAuthzStatementDiarioPreferenciaAgrupamentoUpdate
  | IAuthzStatementDiarioPreferenciaAgrupamentoFind
  | IAuthzStatementDiarioPreferenciaAgrupamentoDelete
  | IAuthzStatementHorarioGeradoUpdate
  | IAuthzStatementHorarioGeradoFind
  | IAuthzStatementHorarioGeradoDelete
  | IAuthzStatementHorarioGeradoAulaUpdate
  | IAuthzStatementHorarioGeradoAulaDelete
  | IAuthzStatementHorarioGeradoAulaFind;

// =====================

export type IAuthzStatement = IAuthzStatementFilter | IAuthzStatementCheck;

// ===================================================================================

export const createStatement = <Statement extends IAuthzStatement>(statement: Omit<Statement, "payload">) => statement as Statement;

// ===================================================================================
