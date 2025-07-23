import { Module } from "@nestjs/common";

import { AmbienteService } from "./ambiente.service";
import { ArquivoService } from "./arquivo.service";
import { AulaService } from "./aula.service";
import { AutenticacaoService } from "./autenticacao.service";
import { AutorizacaoService } from "./autorizacao.service";
import { BlocoService } from "./bloco.service";
import { CalendarioLetivoService } from "./calendario-letivo.service";
import { CampusService } from "./campus.service";
import { CidadeService } from "./cidade.service";
import { CursoService } from "./curso.service";
import { DiaCalendarioService } from "./dia-calendario.service";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";
import { DiarioProfessorService } from "./diario-professor.service";
import { DiarioService } from "./diario.service";
import { DisciplinaService } from "./disciplina.service";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";
import { DisponibilidadeService } from "./disponibilidade.service";
import { EnderecoService } from "./endereco.service";
import { EstadoService } from "./estado.service";
import { EtapaService } from "./etapa.service";
import { EventoService } from "./evento.service";
import { GerarHorarioService } from "./gerar-horario.service";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";
import { HorarioGeradoService } from "./horario-gerado.service";
import { ImagemService } from "./imagem.service";
import { IntervaloDeTempoService } from "./intervalo-de-tempo.service";
import { ModalidadeService } from "./modalidade.service";
import { NivelFormacaoService } from "./nivel-formacao.service";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";
import { OfertaFormacaoService } from "./oferta-formacao.service";
import { PerfilService } from "./perfil.service";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";
import { ReservaService } from "./reserva.service";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";
import { TurmaService } from "./turma.service";
import { UsuarioService } from "./usuario.service";


@Module({
  providers: [
    AmbienteService,
    ArquivoService,
    AulaService,
    AutenticacaoService,
    AutorizacaoService,
    BlocoService,
    CalendarioLetivoService,
    CampusService,
    CidadeService,
    CursoService,
    DiaCalendarioService,
    DiarioPreferenciaAgrupamentoService,
    DiarioProfessorService,
    DiarioService,
    DisciplinaService,
    DisponibilidadeDiaService,
    DisponibilidadeService,
    EnderecoService,
    EstadoService,
    EtapaService,
    EventoService,
    GerarHorarioService,
    GradeHorarioOfertaFormacaoIntervaloDeTempoService,
    GradeHorarioOfertaFormacaoService,
    HorarioGeradoAulaService,
    HorarioGeradoService,
    ImagemService,
    IntervaloDeTempoService,
    ModalidadeService,
    NivelFormacaoService,
    OfertaFormacaoNivelFormacaoService,
    OfertaFormacaoService,
    PerfilService,
    ProfessorDisponibilidadeService,
    ReservaService,
    TurmaDisponibilidadeService,
    TurmaService,
    UsuarioService,
  ],
  exports: [
    AmbienteService,
    ArquivoService,
    AulaService,
    AutenticacaoService,
    AutorizacaoService,
    BlocoService,
    CalendarioLetivoService,
    CampusService,
    CidadeService,
    CursoService,
    DiaCalendarioService,
    DiarioPreferenciaAgrupamentoService,
    DiarioProfessorService,
    DiarioService,
    DisciplinaService,
    DisponibilidadeDiaService,
    DisponibilidadeService,
    EnderecoService,
    EstadoService,
    EtapaService,
    EventoService,
    GerarHorarioService,
    GradeHorarioOfertaFormacaoIntervaloDeTempoService,
    GradeHorarioOfertaFormacaoService,
    HorarioGeradoAulaService,
    HorarioGeradoService,
    ImagemService,
    IntervaloDeTempoService,
    ModalidadeService,
    NivelFormacaoService,
    OfertaFormacaoNivelFormacaoService,
    OfertaFormacaoService,
    PerfilService,
    ProfessorDisponibilidadeService,
    ReservaService,
    TurmaDisponibilidadeService,
    TurmaService,
    UsuarioService,
  ]
})
export class ServicesModule { }