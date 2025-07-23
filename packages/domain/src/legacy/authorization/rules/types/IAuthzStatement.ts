import * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
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
    dto: IDomainContracts.CampusCreateInput;
  }
>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<
  "campus:update",
  {
    dto: IDomainContracts.CampusUpdateInput;
  }
>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<
  "campus:delete",
  {
    dto: IDomainContracts.CampusFindOneInput;
  }
>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<
  "bloco:create",
  {
    dto: IDomainContracts.BlocoCreateInput;
  }
>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<
  "bloco:update",
  {
    dto: IDomainContracts.BlocoUpdateInput;
  }
>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<
  "bloco:delete",
  {
    dto: IDomainContracts.BlocoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<
  "ambiente:create",
  {
    dto: IDomainContracts.AmbienteCreateInput;
  }
>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<
  "ambiente:update",
  {
    dto: IDomainContracts.AmbienteUpdateInput;
  }
>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<
  "ambiente:delete",
  {
    dto: IDomainContracts.AmbienteFindOneInput;
  }
>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<
  "usuario:create",
  {
    dto: IDomainContracts.UsuarioCreateInput;
  }
>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<
  "usuario:update",
  {
    dto: IDomainContracts.UsuarioUpdateInput;
  }
>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<
  "usuario:delete",
  {
    dto: IDomainContracts.UsuarioFindOneInput;
  }
>;

// =====================

export type IAuthzStatementNivelFormacaoCreate = IBaseAuthzCheck<
  "nivel_formacao:create",
  {
    dto: IDomainContracts.NivelFormacaoCreateInput;
  }
>;
export type IAuthzStatementNivelFormacaoFind = IBaseAuthzFilter<"nivel_formacao:find">;
export type IAuthzStatementNivelFormacaoUpdate = IBaseAuthzFilter<
  "nivel_formacao:update",
  {
    dto: IDomainContracts.NivelFormacaoUpdateInput;
  }
>;
export type IAuthzStatementNivelFormacaoDelete = IBaseAuthzFilter<
  "nivel_formacao:delete",
  {
    dto: IDomainContracts.NivelFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<
  "modalidade:create",
  {
    dto: IDomainContracts.ModalidadeCreateInput;
  }
>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<
  "modalidade:update",
  {
    dto: IDomainContracts.ModalidadeUpdateInput;
  }
>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<
  "modalidade:delete",
  {
    dto: IDomainContracts.ModalidadeFindOneInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoNivelFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao_nivel_formacao:create",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoCreateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoFind = IBaseAuthzFilter<"oferta_formacao_nivel_formacao:find">;

export type IAuthzStatementOfertaFormacaoNivelFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:update",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoUpdateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:delete",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao:create",
  {
    dto: IDomainContracts.OfertaFormacaoCreateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoFind = IBaseAuthzFilter<"oferta_formacao:find">;
export type IAuthzStatementOfertaFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao:update",
  {
    dto: IDomainContracts.OfertaFormacaoUpdateInput;
  }
>;
export type IAuthzStatementOfertaFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao:delete",
  {
    dto: IDomainContracts.OfertaFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<
  "curso:create",
  {
    dto: IDomainContracts.CursoCreateInput;
  }
>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<
  "curso:update",
  {
    dto: IDomainContracts.CursoUpdateInput;
  }
>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<
  "curso:delete",
  {
    dto: IDomainContracts.CursoFindOneInput;
  }
>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<
  "disciplina:create",
  {
    dto: IDomainContracts.DisciplinaCreateInput;
  }
>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<
  "disciplina:update",
  {
    dto: IDomainContracts.DisciplinaUpdateInput;
  }
>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<
  "disciplina:delete",
  {
    dto: IDomainContracts.DisciplinaFindOneInput;
  }
>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<
  "turma:create",
  {
    dto: IDomainContracts.TurmaCreateInput;
  }
>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<
  "turma:update",
  {
    dto: IDomainContracts.TurmaUpdateInput;
  }
>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<
  "turma:delete",
  {
    dto: IDomainContracts.TurmaFindOneInput;
  }
>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<
  "diario:create",
  {
    dto: IDomainContracts.DiarioCreateInput;
  }
>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<
  "diario:update",
  {
    dto: IDomainContracts.DiarioUpdateInput;
  }
>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<
  "diario:delete",
  {
    dto: IDomainContracts.DiarioFindOneInput;
  }
>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<
  "reserva:create",
  {
    dto: IDomainContracts.ReservaCreateInput;
  }
>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<
  "reserva:update",
  {
    dto: IDomainContracts.ReservaUpdateInput;
  }
>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<
  "reserva:delete",
  {
    dto: IDomainContracts.ReservaFindOneInput;
  }
>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<
  "calendario_letivo:create",
  {
    dto: IDomainContracts.CalendarioLetivoCreateInput;
  }
>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<
  "calendario_letivo:update",
  {
    dto: IDomainContracts.CalendarioLetivoUpdateInput;
  }
>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<
  "calendario_letivo:delete",
  {
    dto: IDomainContracts.CalendarioLetivoFindOneInput;
  }
>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao:create",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoCreateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:update",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoUpdateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:delete",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao_intervalo_de_tempo:create",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao_intervalo_de_tempo:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:update",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput;
  }
>;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<
  "diario_professor:create",
  {
    dto: IDomainContracts.DiarioProfessorCreateInput;
  }
>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<
  "diario_professor:update",
  {
    dto: IDomainContracts.DiarioProfessorUpdateInput;
  }
>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<
  "diario_professor:delete",
  {
    dto: IDomainContracts.DiarioProfessorFindOneInput;
  }
>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<
  "evento:create",
  {
    dto: IDomainContracts.EventoCreateInput;
  }
>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<
  "evento:update",
  {
    dto: IDomainContracts.EventoUpdateInput;
  }
>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<
  "evento:delete",
  {
    dto: IDomainContracts.EventoFindOneInput;
  }
>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<
  "dia_calendario:create",
  {
    dto: IDomainContracts.DiaCalendarioCreateInput;
  }
>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<
  "dia_calendario:update",
  {
    dto: IDomainContracts.DiaCalendarioUpdateInput;
  }
>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<
  "dia_calendario:delete",
  {
    dto: IDomainContracts.DiaCalendarioFindOneInput;
  }
>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<
  "etapa:create",
  {
    dto: IDomainContracts.EtapaCreateInput;
  }
>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<
  "etapa:update",
  {
    dto: IDomainContracts.EtapaUpdateInput;
  }
>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<
  "etapa:delete",
  {
    dto: IDomainContracts.EtapaFindOneInput;
  }
>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<
  "aula:create",
  {
    dto: IDomainContracts.AulaCreateInput;
  }
>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<
  "aula:update",
  {
    dto: IDomainContracts.AulaUpdateInput;
  }
>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<
  "aula:delete",
  {
    dto: IDomainContracts.AulaFindOneInput;
  }
>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDisponibilidadeCreate = IBaseAuthzCheck<
  "disponibilidade:create",
  {
    dto: IDomainContracts.DisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementDisponibilidadeUpdate = IBaseAuthzFilter<
  "disponibilidade:update",
  {
    dto: IDomainContracts.DisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDelete = IBaseAuthzFilter<
  "disponibilidade:delete",
  {
    dto: IDomainContracts.DisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementDisponibilidadeFind = IBaseAuthzFilter<"disponibilidade:find">;

// =====================

export type IAuthzStatementDisponibilidadeDiaCreate = IBaseAuthzCheck<
  "disponibilidade_dia:create",
  {
    dto: IDomainContracts.DisponibilidadeDiaCreateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaUpdate = IBaseAuthzFilter<
  "disponibilidade_dia:update",
  {
    dto: IDomainContracts.DisponibilidadeDiaUpdateInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaDelete = IBaseAuthzFilter<
  "disponibilidade_dia:delete",
  {
    dto: IDomainContracts.DisponibilidadeDiaFindOneInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaFind = IBaseAuthzFilter<"disponibilidade_dia:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeCreate = IBaseAuthzCheck<
  "turma_disponibilidade:create",
  {
    dto: IDomainContracts.TurmaDisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeUpdate = IBaseAuthzFilter<
  "turma_disponibilidade:update",
  {
    dto: IDomainContracts.TurmaDisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeDelete = IBaseAuthzFilter<
  "turma_disponibilidade:delete",
  {
    dto: IDomainContracts.TurmaDisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeFind = IBaseAuthzFilter<"turma_disponibilidade:find">;

// =====================

export type IAuthzStatementProfessorDisponibilidadeCreate = IBaseAuthzCheck<
  "professor_disponibilidade:create",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeCreateInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeUpdate = IBaseAuthzFilter<
  "professor_disponibilidade:update",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeUpdateInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeDelete = IBaseAuthzFilter<
  "professor_disponibilidade:delete",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeFindOneInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeFind = IBaseAuthzFilter<"professor_disponibilidade:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<
  "diario_preferencia_agrupamento:create",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoCreateInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:update",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoUpdateInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:delete",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<
  "horario_gerado:create",
  {
    dto: IDomainContracts.HorarioGeradoCreateInput;
  }
>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<
  "horario_gerado:update",
  {
    dto: IDomainContracts.HorarioGeradoUpdateInput;
  }
>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<
  "horario_gerado:delete",
  {
    dto: IDomainContracts.HorarioGeradoFindOneInput;
  }
>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<
  "horario_gerado_aula:create",
  {
    dto: IDomainContracts.HorarioGeradoAulaCreateInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<
  "horario_gerado_aula:update",
  {
    dto: IDomainContracts.HorarioGeradoAulaUpdateInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<
  "horario_gerado_aula:delete",
  {
    dto: IDomainContracts.HorarioGeradoAulaFindOneInput;
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
  //
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
