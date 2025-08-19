import { IDomain } from "@/legacy/domain/contracts/integration";
import { IBaseAuthzCheck, IBaseAuthzFilter } from "./IBaseAuthz";

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<"endereco:find">;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<"estado:find">;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<"cidade:find">;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<
  "campus:create",
  {
    dto: IDomain.CampusCreateInput;
  }
>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<
  "campus:update",
  {
    dto: IDomain.CampusUpdateInput;
  }
>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<
  "campus:delete",
  {
    dto: IDomain.CampusFindOneInput;
  }
>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<
  "bloco:create",
  {
    dto: IDomain.BlocoCreateInput;
  }
>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<
  "bloco:update",
  {
    dto: IDomain.BlocoUpdateInput;
  }
>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<
  "bloco:delete",
  {
    dto: IDomain.BlocoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<
  "ambiente:create",
  {
    dto: IDomain.AmbienteCreateInput;
  }
>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<
  "ambiente:update",
  {
    dto: IDomain.AmbienteUpdateInput;
  }
>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<
  "ambiente:delete",
  {
    dto: IDomain.AmbienteFindOneInput;
  }
>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<
  "usuario:create",
  {
    dto: IDomain.UsuarioCreateInput;
  }
>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<
  "usuario:update",
  {
    dto: IDomain.UsuarioUpdateInput;
  }
>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<
  "usuario:delete",
  {
    dto: IDomain.UsuarioFindOneInput;
  }
>;

// =====================

export type IAuthzStatementNivelFormacaoCreate = IBaseAuthzCheck<
  "nivel_formacao:create",
  {
    dto: IDomain.NivelFormacaoCreateInput;
  }
>;
export type IAuthzStatementNivelFormacaoFind = IBaseAuthzFilter<"nivel_formacao:find">;
export type IAuthzStatementNivelFormacaoUpdate = IBaseAuthzFilter<
  "nivel_formacao:update",
  {
    dto: IDomain.NivelFormacaoUpdateInput;
  }
>;
export type IAuthzStatementNivelFormacaoDelete = IBaseAuthzFilter<
  "nivel_formacao:delete",
  {
    dto: IDomain.NivelFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<
  "modalidade:create",
  {
    dto: IDomain.ModalidadeCreateInput;
  }
>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<
  "modalidade:update",
  {
    dto: IDomain.ModalidadeUpdateInput;
  }
>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<
  "modalidade:delete",
  {
    dto: IDomain.ModalidadeFindOneInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoNivelFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao_nivel_formacao:create",
  {
    dto: IDomain.OfertaFormacaoNivelFormacaoCreateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoFind = IBaseAuthzFilter<"oferta_formacao_nivel_formacao:find">;

export type IAuthzStatementOfertaFormacaoNivelFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:update",
  {
    dto: IDomain.OfertaFormacaoNivelFormacaoUpdateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:delete",
  {
    dto: IDomain.OfertaFormacaoNivelFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao:create",
  {
    dto: IDomain.OfertaFormacaoCreateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoFind = IBaseAuthzFilter<"oferta_formacao:find">;
export type IAuthzStatementOfertaFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao:update",
  {
    dto: IDomain.OfertaFormacaoUpdateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao:delete",
  {
    dto: IDomain.OfertaFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<
  "curso:create",
  {
    dto: IDomain.CursoCreateInput;
  }
>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<
  "curso:update",
  {
    dto: IDomain.CursoUpdateInput;
  }
>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<
  "curso:delete",
  {
    dto: IDomain.CursoFindOneInput;
  }
>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<
  "disciplina:create",
  {
    dto: IDomain.DisciplinaCreateInput;
  }
>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<
  "disciplina:update",
  {
    dto: IDomain.DisciplinaUpdateInput;
  }
>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<
  "disciplina:delete",
  {
    dto: IDomain.DisciplinaFindOneInput;
  }
>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<
  "turma:create",
  {
    dto: IDomain.TurmaCreateInput;
  }
>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<
  "turma:update",
  {
    dto: IDomain.TurmaUpdateInput;
  }
>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<
  "turma:delete",
  {
    dto: IDomain.TurmaFindOneInput;
  }
>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<
  "diario:create",
  {
    dto: IDomain.DiarioCreateInput;
  }
>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<
  "diario:update",
  {
    dto: IDomain.DiarioUpdateInput;
  }
>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<
  "diario:delete",
  {
    dto: IDomain.DiarioFindOneInput;
  }
>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<
  "reserva:create",
  {
    dto: IDomain.ReservaCreateInput;
  }
>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<
  "reserva:update",
  {
    dto: IDomain.ReservaUpdateInput;
  }
>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<
  "reserva:delete",
  {
    dto: IDomain.ReservaFindOneInput;
  }
>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<
  "calendario_letivo:create",
  {
    dto: IDomain.CalendarioLetivoCreateInput;
  }
>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<
  "calendario_letivo:update",
  {
    dto: IDomain.CalendarioLetivoUpdateInput;
  }
>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<
  "calendario_letivo:delete",
  {
    dto: IDomain.CalendarioLetivoFindOneInput;
  }
>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao:create",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoCreateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:update",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoUpdateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:delete",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao_intervalo_de_tempo:create",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao_intervalo_de_tempo:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:update",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
  {
    dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<
  "diario_professor:create",
  {
    dto: IDomain.DiarioProfessorCreateInput;
  }
>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<
  "diario_professor:update",
  {
    dto: IDomain.DiarioProfessorUpdateInput;
  }
>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<
  "diario_professor:delete",
  {
    dto: IDomain.DiarioProfessorFindOneInput;
  }
>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<
  "evento:create",
  {
    dto: IDomain.EventoCreateInput;
  }
>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<
  "evento:update",
  {
    dto: IDomain.EventoUpdateInput;
  }
>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<
  "evento:delete",
  {
    dto: IDomain.EventoFindOneInput;
  }
>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<
  "dia_calendario:create",
  {
    dto: IDomain.DiaCalendarioCreateInput;
  }
>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<
  "dia_calendario:update",
  {
    dto: IDomain.DiaCalendarioUpdateInput;
  }
>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<
  "dia_calendario:delete",
  {
    dto: IDomain.DiaCalendarioFindOneInput;
  }
>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<
  "etapa:create",
  {
    dto: IDomain.EtapaCreateInput;
  }
>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<
  "etapa:update",
  {
    dto: IDomain.EtapaUpdateInput;
  }
>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<
  "etapa:delete",
  {
    dto: IDomain.EtapaFindOneInput;
  }
>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<
  "aula:create",
  {
    dto: IDomain.AulaCreateInput;
  }
>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<
  "aula:update",
  {
    dto: IDomain.AulaUpdateInput;
  }
>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<
  "aula:delete",
  {
    dto: IDomain.AulaFindOneInput;
  }
>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDisponibilidadeCreate = IBaseAuthzCheck<
  "disponibilidade:create",
  {
    dto: IDomain.DisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementDisponibilidadeUpdate = IBaseAuthzFilter<
  "disponibilidade:update",
  {
    dto: IDomain.DisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDelete = IBaseAuthzFilter<
  "disponibilidade:delete",
  {
    dto: IDomain.DisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementDisponibilidadeFind = IBaseAuthzFilter<"disponibilidade:find">;

// =====================

export type IAuthzStatementDisponibilidadeDiaCreate = IBaseAuthzCheck<
  "disponibilidade_dia:create",
  {
    dto: IDomain.DisponibilidadeDiaCreateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaUpdate = IBaseAuthzFilter<
  "disponibilidade_dia:update",
  {
    dto: IDomain.DisponibilidadeDiaUpdateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaDelete = IBaseAuthzFilter<
  "disponibilidade_dia:delete",
  {
    dto: IDomain.DisponibilidadeDiaFindOneInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaFind = IBaseAuthzFilter<"disponibilidade_dia:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeCreate = IBaseAuthzCheck<
  "turma_disponibilidade:create",
  {
    dto: IDomain.TurmaDisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeUpdate = IBaseAuthzFilter<
  "turma_disponibilidade:update",
  {
    dto: IDomain.TurmaDisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeDelete = IBaseAuthzFilter<
  "turma_disponibilidade:delete",
  {
    dto: IDomain.TurmaDisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeFind = IBaseAuthzFilter<"turma_disponibilidade:find">;

// =====================

export type IAuthzStatementProfessorDisponibilidadeCreate = IBaseAuthzCheck<
  "professor_disponibilidade:create",
  {
    dto: IDomain.ProfessorDisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeUpdate = IBaseAuthzFilter<
  "professor_disponibilidade:update",
  {
    dto: IDomain.ProfessorDisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeDelete = IBaseAuthzFilter<
  "professor_disponibilidade:delete",
  {
    dto: IDomain.ProfessorDisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeFind = IBaseAuthzFilter<"professor_disponibilidade:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<
  "diario_preferencia_agrupamento:create",
  {
    dto: IDomain.DiarioPreferenciaAgrupamentoCreateInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:update",
  {
    dto: IDomain.DiarioPreferenciaAgrupamentoUpdateInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:delete",
  {
    dto: IDomain.DiarioPreferenciaAgrupamentoFindOneInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<
  "horario_gerado:create",
  {
    dto: IDomain.HorarioGeradoCreateInput;
  }
>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<
  "horario_gerado:update",
  {
    dto: IDomain.HorarioGeradoUpdateInput;
  }
>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<
  "horario_gerado:delete",
  {
    dto: IDomain.HorarioGeradoFindOneInput;
  }
>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<
  "horario_gerado_aula:create",
  {
    dto: IDomain.HorarioGeradoAulaCreateInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<
  "horario_gerado_aula:update",
  {
    dto: IDomain.HorarioGeradoAulaUpdateInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<
  "horario_gerado_aula:delete",
  {
    dto: IDomain.HorarioGeradoAulaFindOneInput;
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
  | IAuthzStatementDisponibilidadeDiaCreate
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
  | IAuthzStatementDisponibilidadeDiaUpdate
  | IAuthzStatementDisponibilidadeDiaFind
  | IAuthzStatementDisponibilidadeDiaDelete
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
