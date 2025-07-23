import { ServicesModule } from "@ladesa-ro/management-management-service.domain";
import { Module } from "@nestjs/common";

import { AmbienteController } from "./ambiente.controller";
import { AppController } from "./app.controller";
import { ArquivoController } from "./arquivo.controller";
import { AulaController } from "./aula.controller";
import { AutenticacaoController } from "./autenticacao.controller";
import { AutorizacaoController } from "./autorizacao.controller";
import { BlocoController } from "./bloco.controller";
import { CalendarioLetivoController } from "./calendario-letivo.controller";
import { CampusController } from "./campus.controller";
import { CidadeController } from "./cidade.controller";
import { CursoController } from "./curso.controller";
import { DiaCalendarioController } from "./dia-calendario.controller";
import { DiarioPreferenciaAgrupamentoController } from "./diario-preferencia-agrupamento.controller";
import { DiarioProfessorController } from "./diario-professor.controller";
import { DiarioController } from "./diario.controller";
import { DisciplinaController } from "./disciplina.controller";
import { DisponibilidadeDiaController } from "./disponibilidade-dia.controller";
import { DisponibilidadeController } from "./disponibilidade.controller";
import { EstadoController } from "./estado.controller";
import { EtapaController } from "./etapa.controller";
import { EventoController } from "./evento.controller";
import { GerarHorarioController } from "./gerar-horario.controller";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoController } from "./grade-horario-oferta-formacao-intervalo-de-tempo.controller";
import { GradeHorarioOfertaFormacaoController } from "./grade-horario-oferta-formacao.controller";
import { HealthController } from "./health.controller";
import { HorarioGeradoAulaController } from "./horario-gerado-aula.controller";
import { HorarioGeradoController } from "./horario-gerado.controller";
import { ModalidadeController } from "./modalidade.controller";
import { NivelFormacaoController } from "./nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoController } from "./oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoController } from "./oferta-formacao.controller";
import { PerfilController } from "./perfil.controller";
import { ProfessorDisponibilidadeController } from "./professor-disponibilidade.controller";
import { ReservaController } from "./reserva.controller";
import { TurmaDisponibilidadeController } from "./turma-disponibilidade.controller";
import { TurmaController } from "./turma.controller";
import { UsuarioController } from "./usuario.controller";

@Module({
  imports: [ServicesModule],
  providers: [
    AppController,
    AmbienteController,
    ArquivoController,
    AulaController,
    AutenticacaoController,
    AutorizacaoController,
    BlocoController,
    CalendarioLetivoController,
    CampusController,
    CidadeController,
    CursoController,
    DiaCalendarioController,
    DiarioPreferenciaAgrupamentoController,
    DiarioProfessorController,
    DiarioController,
    DisciplinaController,
    DisponibilidadeDiaController,
    DisponibilidadeController,
    EstadoController,
    EtapaController,
    EventoController,
    GerarHorarioController,
    GradeHorarioOfertaFormacaoIntervaloDeTempoController,
    GradeHorarioOfertaFormacaoController,
    HealthController,
    HorarioGeradoAulaController,
    HorarioGeradoController,
    ModalidadeController,
    NivelFormacaoController,
    OfertaFormacaoNivelFormacaoController,
    OfertaFormacaoController,
    PerfilController,
    ProfessorDisponibilidadeController,
    ReservaController,
    TurmaDisponibilidadeController,
    TurmaController,
    UsuarioController,
  ],
  exports: [
    AppController,
    AmbienteController,
    ArquivoController,
    AulaController,
    AutenticacaoController,
    AutorizacaoController,
    BlocoController,
    CalendarioLetivoController,
    CampusController,
    CidadeController,
    CursoController,
    DiaCalendarioController,
    DiarioPreferenciaAgrupamentoController,
    DiarioProfessorController,
    DiarioController,
    DisciplinaController,
    DisponibilidadeDiaController,
    DisponibilidadeController,
    EstadoController,
    EtapaController,
    EventoController,
    GerarHorarioController,
    GradeHorarioOfertaFormacaoIntervaloDeTempoController,
    GradeHorarioOfertaFormacaoController,
    HealthController,
    HorarioGeradoAulaController,
    HorarioGeradoController,
    ModalidadeController,
    NivelFormacaoController,
    OfertaFormacaoNivelFormacaoController,
    OfertaFormacaoController,
    PerfilController,
    ProfessorDisponibilidadeController,
    ReservaController,
    TurmaDisponibilidadeController,
    TurmaController,
    UsuarioController,
  ]
})
export class ControllersModule { }