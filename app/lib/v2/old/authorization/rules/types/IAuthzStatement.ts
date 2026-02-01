/**
 * @deprecated Use `import { IAuthzStatement, IAuthzStatementCheck, IAuthzStatementFilter, createStatement } from "@/modules/@core/authorization"` instead.
 * Este arquivo será removido na próxima versão major.
 */
export type {
  IAuthzStatement,
  IAuthzStatementCheck,
  IAuthzStatementFilter,
} from "@/modules/@core/authorization";

export { createStatement } from "@/modules/@core/authorization";

export type IAuthzStatementEnderecoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"endereco:find">;
export type IAuthzStatementEstadoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"estado:find">;
export type IAuthzStatementCidadeFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"cidade:find">;
export type IAuthzStatementCampusCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "campus:create",
  { dto: object }
>;
export type IAuthzStatementCampusFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "campus:update",
  { dto: object }
>;
export type IAuthzStatementCampusDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "campus:delete",
  { dto: object }
>;
export type IAuthzStatementBlocoCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "bloco:create",
  { dto: object }
>;
export type IAuthzStatementBlocoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "bloco:update",
  { dto: object }
>;
export type IAuthzStatementBlocoDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "bloco:delete",
  { dto: object }
>;
export type IAuthzStatementAmbienteCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "ambiente:create",
  { dto: object }
>;
export type IAuthzStatementAmbienteFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"ambiente:update", { dto: object }>;
export type IAuthzStatementAmbienteDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"ambiente:delete", { dto: object }>;
export type IAuthzStatementUsuarioCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "usuario:create",
  { dto: object }
>;
export type IAuthzStatementUsuarioFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "usuario:update",
  { dto: object }
>;
export type IAuthzStatementUsuarioDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "usuario:delete",
  { dto: object }
>;
export type IAuthzStatementModalidadeCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<"modalidade:create", { dto: object }>;
export type IAuthzStatementModalidadeFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"modalidade:update", { dto: object }>;
export type IAuthzStatementModalidadeDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"modalidade:delete", { dto: object }>;
export type IAuthzStatementVinculoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"vinculo:find">;
export type IAuthzStatementCursoCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "curso:create",
  { dto: object }
>;
export type IAuthzStatementCursoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"curso:find">;
export type IAuthzStatementCursoUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "curso:update",
  { dto: object }
>;
export type IAuthzStatementCursoDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "curso:delete",
  { dto: object }
>;
export type IAuthzStatementDisciplinaCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<"disciplina:create", { dto: object }>;
export type IAuthzStatementDisciplinaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"disciplina:find">;
export type IAuthzStatementDisciplinaUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"disciplina:update", { dto: object }>;
export type IAuthzStatementDisciplinaDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"disciplina:delete", { dto: object }>;
export type IAuthzStatementTurmaCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "turma:create",
  { dto: object }
>;
export type IAuthzStatementTurmaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"turma:find">;
export type IAuthzStatementTurmaUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "turma:update",
  { dto: object }
>;
export type IAuthzStatementTurmaDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "turma:delete",
  { dto: object }
>;
export type IAuthzStatementDiarioCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "diario:create",
  { dto: object }
>;
export type IAuthzStatementDiarioFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"diario:find">;
export type IAuthzStatementDiarioUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "diario:update",
  { dto: object }
>;
export type IAuthzStatementDiarioDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "diario:delete",
  { dto: object }
>;
export type IAuthzStatementReservaCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "reserva:create",
  { dto: object }
>;
export type IAuthzStatementReservaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"reserva:find">;
export type IAuthzStatementReservaUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "reserva:update",
  { dto: object }
>;
export type IAuthzStatementReservaDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "reserva:delete",
  { dto: object }
>;
export type IAuthzStatementCalendarioLetivoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "calendario_letivo:create",
    { dto: object }
  >;
export type IAuthzStatementCalendarioLetivoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"calendario_letivo:find">;
export type IAuthzStatementCalendarioLetivoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "calendario_letivo:update",
    { dto: object }
  >;
export type IAuthzStatementCalendarioLetivoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "calendario_letivo:delete",
    { dto: object }
  >;
export type IAuthzStatementEtapaCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "etapa:create",
  { dto: object }
>;
export type IAuthzStatementEtapaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"etapa:find">;
export type IAuthzStatementEtapaUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "etapa:update",
  { dto: object }
>;
export type IAuthzStatementEtapaDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "etapa:delete",
  { dto: object }
>;
export type IAuthzStatementAulaCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "aula:create",
  { dto: object }
>;
export type IAuthzStatementAulaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"aula:find">;
export type IAuthzStatementAulaUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "aula:update",
  { dto: object }
>;
export type IAuthzStatementAulaDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "aula:delete",
  { dto: object }
>;
export type IAuthzStatementDiaCalendarioCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<"dia_calendario:create", { dto: object }>;
export type IAuthzStatementDiaCalendarioFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"dia_calendario:find">;
export type IAuthzStatementDiaCalendarioUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "dia_calendario:update",
    { dto: object }
  >;
export type IAuthzStatementDiaCalendarioDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "dia_calendario:delete",
    { dto: object }
  >;
export type IAuthzStatementEventoCreate = import("@/modules/@core/authorization").IBaseAuthzCheck<
  "evento:create",
  { dto: object }
>;
export type IAuthzStatementEventoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"evento:find">;
export type IAuthzStatementEventoUpdate = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "evento:update",
  { dto: object }
>;
export type IAuthzStatementEventoDelete = import("@/modules/@core/authorization").IBaseAuthzFilter<
  "evento:delete",
  { dto: object }
>;
export type IAuthzStatementDiarioProfessorCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "diario_professor:create",
    { dto: object }
  >;
export type IAuthzStatementDiarioProfessorFilter =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"diario_professor:find">;
export type IAuthzStatementDiarioProfessorUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "diario_professor:update",
    { dto: object }
  >;
export type IAuthzStatementDiarioProfessorDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "diario_professor:delete",
    { dto: object }
  >;
export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "diario_preferencia_agrupamento:create",
    { dto: object }
  >;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "diario_preferencia_agrupamento:update",
    { dto: object }
  >;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "diario_preferencia_agrupamento:delete",
    { dto: object }
  >;
export type IAuthzStatementHorarioGeradoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<"horario_gerado:create", { dto: object }>;
export type IAuthzStatementHorarioGeradoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"horario_gerado:find">;
export type IAuthzStatementHorarioGeradoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "horario_gerado:update",
    { dto: object }
  >;
export type IAuthzStatementHorarioGeradoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "horario_gerado:delete",
    { dto: object }
  >;
export type IAuthzStatementHorarioGeradoAulaCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "horario_gerado_aula:create",
    { dto: object }
  >;
export type IAuthzStatementHorarioGeradoAulaFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"horario_gerado_aula:find">;
export type IAuthzStatementHorarioGeradoAulaUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "horario_gerado_aula:update",
    { dto: object }
  >;
export type IAuthzStatementHorarioGeradoAulaDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "horario_gerado_aula:delete",
    { dto: object }
  >;
export type IAuthzStatementNivelFormacaoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<"nivel_formacao:create", { dto: object }>;
export type IAuthzStatementNivelFormacaoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"nivel_formacao:find">;
export type IAuthzStatementNivelFormacaoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "nivel_formacao:update",
    { dto: object }
  >;
export type IAuthzStatementNivelFormacaoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "nivel_formacao:delete",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "oferta_formacao:create",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"oferta_formacao:find">;
export type IAuthzStatementOfertaFormacaoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "oferta_formacao:update",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "oferta_formacao:delete",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoNivelFormacaoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "oferta_formacao_nivel_formacao:create",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoNivelFormacaoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"oferta_formacao_nivel_formacao:find">;
export type IAuthzStatementOfertaFormacaoNivelFormacaoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "oferta_formacao_nivel_formacao:update",
    { dto: object }
  >;
export type IAuthzStatementOfertaFormacaoNivelFormacaoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "oferta_formacao_nivel_formacao:delete",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "grade_horario_oferta_formacao:create",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"grade_horario_oferta_formacao:find">;
export type IAuthzStatementGradeHorarioOfertaFormacaoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "grade_horario_oferta_formacao:update",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "grade_horario_oferta_formacao:delete",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "grade_horario_oferta_formacao_intervalo_de_tempo:create",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"grade_horario_oferta_formacao_intervalo_de_tempo:find">;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "grade_horario_oferta_formacao_intervalo_de_tempo:update",
    { dto: object }
  >;
export type IAuthzStatementGradeHorarioOfertaFormacaoIntervaloDeTempoDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
    { dto: object }
  >;
export type IAuthzStatementDisponibilidadeCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "disponibilidade:create",
    { dto: object }
  >;
export type IAuthzStatementDisponibilidadeFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"disponibilidade:find">;
export type IAuthzStatementDisponibilidadeUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "disponibilidade:update",
    { dto: object }
  >;
export type IAuthzStatementDisponibilidadeDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "disponibilidade:delete",
    { dto: object }
  >;
export type IAuthzStatementTurmaDisponibilidadeCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "turma_disponibilidade:create",
    { dto: object }
  >;
export type IAuthzStatementTurmaDisponibilidadeFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"turma_disponibilidade:find">;
export type IAuthzStatementTurmaDisponibilidadeUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "turma_disponibilidade:update",
    { dto: object }
  >;
export type IAuthzStatementTurmaDisponibilidadeDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "turma_disponibilidade:delete",
    { dto: object }
  >;
export type IAuthzStatementProfessorDisponibilidadeCreate =
  import("@/modules/@core/authorization").IBaseAuthzCheck<
    "professor_disponibilidade:create",
    { dto: object }
  >;
export type IAuthzStatementProfessorDisponibilidadeFind =
  import("@/modules/@core/authorization").IBaseAuthzFilter<"professor_disponibilidade:find">;
export type IAuthzStatementProfessorDisponibilidadeUpdate =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "professor_disponibilidade:update",
    { dto: object }
  >;
export type IAuthzStatementProfessorDisponibilidadeDelete =
  import("@/modules/@core/authorization").IBaseAuthzFilter<
    "professor_disponibilidade:delete",
    { dto: object }
  >;
