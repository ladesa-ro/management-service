import * as IDomainContracts from "@ladesa-ro/especificacao";
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
    dto: IDomainContracts.CampusCreateOperationInput;
  }
>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<
  "campus:update",
  {
    dto: IDomainContracts.CampusUpdateOperationInput;
  }
>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<
  "campus:delete",
  {
    dto: IDomainContracts.CampusFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<
  "bloco:create",
  {
    dto: IDomainContracts.BlocoCreateOperationInput;
  }
>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<
  "bloco:update",
  {
    dto: IDomainContracts.BlocoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<
  "bloco:delete",
  {
    dto: IDomainContracts.BlocoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<
  "ambiente:create",
  {
    dto: IDomainContracts.AmbienteCreateOperationInput;
  }
>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<
  "ambiente:update",
  {
    dto: IDomainContracts.AmbienteUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<
  "ambiente:delete",
  {
    dto: IDomainContracts.AmbienteFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<
  "usuario:create",
  {
    dto: IDomainContracts.UsuarioCreateOperationInput;
  }
>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<
  "usuario:update",
  {
    dto: IDomainContracts.UsuarioUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<
  "usuario:delete",
  {
    dto: IDomainContracts.UsuarioFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementNivelFormacaoCreate = IBaseAuthzCheck<
  "nivel_formacao:create",
  {
    dto: IDomainContracts.NivelFormacaoCreateOperationInput;
  }
>;
export type IAuthzStatementNivelFormacaoFind = IBaseAuthzFilter<"nivel_formacao:find">;
export type IAuthzStatementNivelFormacaoUpdate = IBaseAuthzFilter<
  "nivel_formacao:update",
  {
    dto: IDomainContracts.NivelFormacaoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementNivelFormacaoDelete = IBaseAuthzFilter<
  "nivel_formacao:delete",
  {
    dto: IDomainContracts.NivelFormacaoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<
  "modalidade:create",
  {
    dto: IDomainContracts.ModalidadeCreateOperationInput;
  }
>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<
  "modalidade:update",
  {
    dto: IDomainContracts.ModalidadeUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<
  "modalidade:delete",
  {
    dto: IDomainContracts.ModalidadeFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoNivelFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao_nivel_formacao:create",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoCreateOperationInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoFind = IBaseAuthzFilter<"oferta_formacao_nivel_formacao:find">;

export type IAuthzStatementOfertaFormacaoNivelFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:update",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementOfertaFormacaoNivelFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao_nivel_formacao:delete",
  {
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementOfertaFormacaoCreate = IBaseAuthzCheck<
  "oferta_formacao:create",
  {
    dto: IDomainContracts.OfertaFormacaoCreateOperationInput;
  }
>;
export type IAuthzStatementOfertaFormacaoFind = IBaseAuthzFilter<"oferta_formacao:find">;
export type IAuthzStatementOfertaFormacaoUpdate = IBaseAuthzFilter<
  "oferta_formacao:update",
  {
    dto: IDomainContracts.OfertaFormacaoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementOfertaFormacaoDelete = IBaseAuthzFilter<
  "oferta_formacao:delete",
  {
    dto: IDomainContracts.OfertaFormacaoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<
  "curso:create",
  {
    dto: IDomainContracts.CursoCreateOperationInput;
  }
>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<
  "curso:update",
  {
    dto: IDomainContracts.CursoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<
  "curso:delete",
  {
    dto: IDomainContracts.CursoFindOneInputView;
  }
>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<
  "disciplina:create",
  {
    dto: IDomainContracts.DisciplinaCreateOperationInput;
  }
>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<
  "disciplina:update",
  {
    dto: IDomainContracts.DisciplinaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<
  "disciplina:delete",
  {
    dto: IDomainContracts.DisciplinaFindOneInputView;
  }
>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<
  "turma:create",
  {
    dto: IDomainContracts.TurmaCreateOperationInput;
  }
>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<
  "turma:update",
  {
    dto: IDomainContracts.TurmaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<
  "turma:delete",
  {
    dto: IDomainContracts.TurmaFindOneInputView;
  }
>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<
  "diario:create",
  {
    dto: IDomainContracts.DiarioCreateOperationInput;
  }
>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<
  "diario:update",
  {
    dto: IDomainContracts.DiarioUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<
  "diario:delete",
  {
    dto: IDomainContracts.DiarioFindOneInputView;
  }
>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<
  "reserva:create",
  {
    dto: IDomainContracts.ReservaCreateOperationInput;
  }
>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<
  "reserva:update",
  {
    dto: IDomainContracts.ReservaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<
  "reserva:delete",
  {
    dto: IDomainContracts.ReservaFindOneInputView;
  }
>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<
  "calendario_letivo:create",
  {
    dto: IDomainContracts.CalendarioLetivoCreateOperationInput;
  }
>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<
  "calendario_letivo:update",
  {
    dto: IDomainContracts.CalendarioLetivoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<
  "calendario_letivo:delete",
  {
    dto: IDomainContracts.CalendarioLetivoFindOneInputView;
  }
>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao:create",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoCreateOperationInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:update",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao:delete",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate = IBaseAuthzCheck<
  "grade_horario_oferta_formacao_intervalo_de_tempo:create",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateOperationInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind = IBaseAuthzFilter<"grade_horario_oferta_formacao_intervalo_de_tempo:find">;

export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:update",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete = IBaseAuthzFilter<
  "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
  {
    dto: IDomainContracts.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputView;
  }
>;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<
  "diario_professor:create",
  {
    dto: IDomainContracts.DiarioProfessorCreateOperationInput;
  }
>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<
  "diario_professor:update",
  {
    dto: IDomainContracts.DiarioProfessorUpdateByIdOperationInput;
  }
>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<
  "diario_professor:delete",
  {
    dto: IDomainContracts.DiarioProfessorFindOneInputView;
  }
>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<
  "evento:create",
  {
    dto: IDomainContracts.EventoCreateOperationInput;
  }
>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<
  "evento:update",
  {
    dto: IDomainContracts.EventoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<
  "evento:delete",
  {
    dto: IDomainContracts.EventoFindOneInputView;
  }
>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<
  "dia_calendario:create",
  {
    dto: IDomainContracts.DiaCalendarioCreateOperationInput;
  }
>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<
  "dia_calendario:update",
  {
    dto: IDomainContracts.DiaCalendarioUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<
  "dia_calendario:delete",
  {
    dto: IDomainContracts.DiaCalendarioFindOneInputView;
  }
>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<
  "etapa:create",
  {
    dto: IDomainContracts.EtapaCreateOperationInput;
  }
>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<
  "etapa:update",
  {
    dto: IDomainContracts.EtapaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<
  "etapa:delete",
  {
    dto: IDomainContracts.EtapaFindOneInputView;
  }
>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<
  "aula:create",
  {
    dto: IDomainContracts.AulaCreateOperationInput;
  }
>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<
  "aula:update",
  {
    dto: IDomainContracts.AulaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<
  "aula:delete",
  {
    dto: IDomainContracts.AulaFindOneInputView;
  }
>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDisponibilidadeCreate = IBaseAuthzCheck<
  "disponibilidade:create",
  {
    dto: IDomainContracts.DisponibilidadeCreateOperationInput;
  }
>;
export type IAuthzStatementDisponibilidadeUpdate = IBaseAuthzFilter<
  "disponibilidade:update",
  {
    dto: IDomainContracts.DisponibilidadeUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDisponibilidadeDelete = IBaseAuthzFilter<
  "disponibilidade:delete",
  {
    dto: IDomainContracts.DisponibilidadeFindOneInputView;
  }
>;
export type IAuthzStatementDisponibilidadeFind = IBaseAuthzFilter<"disponibilidade:find">;

// =====================

export type IAuthzStatementDisponibilidadeDiaCreate = IBaseAuthzCheck<
  "disponibilidade_dia:create",
  {
    dto: IDomainContracts.DisponibilidadeDiaCreateOperationInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaUpdate = IBaseAuthzFilter<
  "disponibilidade_dia:update",
  {
    dto: IDomainContracts.DisponibilidadeDiaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDisponibilidadeDiaDelete = IBaseAuthzFilter<
  "disponibilidade_dia:delete",
  {
    dto: IDomainContracts.DisponibilidadeDiaFindOneInputView;
  }
>;
export type IAuthzStatementDisponibilidadeDiaFind = IBaseAuthzFilter<"disponibilidade_dia:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeCreate = IBaseAuthzCheck<
  "turma_disponibilidade:create",
  {
    dto: IDomainContracts.TurmaDisponibilidadeCreateOperationInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeUpdate = IBaseAuthzFilter<
  "turma_disponibilidade:update",
  {
    dto: IDomainContracts.TurmaDisponibilidadeUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeDelete = IBaseAuthzFilter<
  "turma_disponibilidade:delete",
  {
    dto: IDomainContracts.TurmaDisponibilidadeFindOneInputView;
  }
>;
export type IAuthzStatementTurmaDisponibilidadeFind = IBaseAuthzFilter<"turma_disponibilidade:find">;

// =====================

export type IAuthzStatementProfessorDisponibilidadeCreate = IBaseAuthzCheck<
  "professor_disponibilidade:create",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeCreateOperationInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeUpdate = IBaseAuthzFilter<
  "professor_disponibilidade:update",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeDelete = IBaseAuthzFilter<
  "professor_disponibilidade:delete",
  {
    dto: IDomainContracts.ProfessorDisponibilidadeFindOneInputView;
  }
>;
export type IAuthzStatementProfessorDisponibilidadeFind = IBaseAuthzFilter<"professor_disponibilidade:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<
  "diario_preferencia_agrupamento:create",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoCreateOperationInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:update",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<
  "diario_preferencia_agrupamento:delete",
  {
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInputView;
  }
>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<
  "horario_gerado:create",
  {
    dto: IDomainContracts.HorarioGeradoCreateOperationInput;
  }
>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<
  "horario_gerado:update",
  {
    dto: IDomainContracts.HorarioGeradoUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<
  "horario_gerado:delete",
  {
    dto: IDomainContracts.HorarioGeradoFindOneInputView;
  }
>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<
  "horario_gerado_aula:create",
  {
    dto: IDomainContracts.HorarioGeradoAulaCreateOperationInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<
  "horario_gerado_aula:update",
  {
    dto: IDomainContracts.HorarioGeradoAulaUpdateByIdOperationInput;
  }
>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<
  "horario_gerado_aula:delete",
  {
    dto: IDomainContracts.HorarioGeradoAulaFindOneInputView;
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
