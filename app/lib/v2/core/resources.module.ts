import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { ArquivoModule } from "@/v2/server/modules/arquivo.module";
import { AulaModule } from "@/v2/server/modules/aula.module";
import { AutenticacaoModule } from "@/v2/server/modules/autenticacao.module";
import { AutorizacaoModule } from "@/v2/server/modules/autorizacao.module";
import { BlocoModule } from "@/v2/server/modules/bloco.module";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo.module";
import { CampusModule } from "@/v2/server/modules/campus.module";
import { CidadeModule } from "@/v2/server/modules/cidade.module";
import { CursoModule } from "@/v2/server/modules/curso.module";
import { DiaCalendarioModule } from "@/v2/server/modules/dia-calendario.module";
import { DiarioModule } from "@/v2/server/modules/diario.module";
import { DiarioPreferenciaAgrupamentoModule } from "@/v2/server/modules/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/v2/server/modules/diario-professor.module";
import { DisciplinaModule } from "@/v2/server/modules/disciplina.module";
import { DisponibilidadeModule } from "@/v2/server/modules/disponibilidade.module";
import { EnderecoModule } from "@/v2/server/modules/endereco.module";
import { EstadoModule } from "@/v2/server/modules/estado.module";
import { EtapaModule } from "@/v2/server/modules/etapa.module";
import { EventoModule } from "@/v2/server/modules/evento.module";
import { GradeHorarioOfertaFormacaoModule } from "@/v2/server/modules/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/v2/server/modules/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HealthModule } from "@/v2/server/modules/health.module";
import { HorarioGeradoModule } from "@/v2/server/modules/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/v2/server/modules/horario-gerado-aula.module";
import { ImagemModule } from "@/v2/server/modules/imagem.module";
import { ImagemArquivoModule } from "@/v2/server/modules/imagem-arquivo.module";
import { IntervaloDeTempoModule } from "@/v2/server/modules/intervalo-de-tempo.module";
import { ModalidadeModule } from "@/v2/server/modules/modalidade.module";
import { NivelFormacaoModule } from "@/v2/server/modules/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/v2/server/modules/oferta-formacao-nivel-formacao.module";
import { PerfilModule } from "@/v2/server/modules/perfil.module";
import { ProfessorIndisponibilidadeModule } from "@/v2/server/modules/professor-indisponibilidade.module";
import { ReservaModule } from "@/v2/server/modules/reserva.module";
import { TurmaModule } from "@/v2/server/modules/turma.module";
import { TurmaDisponibilidadeModule } from "@/v2/server/modules/turma-disponibilidade.module";
import { UsuarioModule } from "@/v2/server/modules/usuario.module";

@Module({
  imports: [
    ModalidadeModule,
    PerfilModule,
    ProfessorIndisponibilidadeModule,
    CursoModule,
    IntervaloDeTempoModule,
    AutorizacaoModule,
    AulaModule,
    UsuarioModule,
    EventoModule,
    DisciplinaModule,
    CampusModule,
    ArquivoModule,
    GradeHorarioOfertaFormacaoIntervaloDeTempoModule,
    ReservaModule,
    CalendarioLetivoModule,
    ImagemArquivoModule,
    DisponibilidadeModule,
    CidadeModule,
    HorarioGeradoModule,
    NivelFormacaoModule,
    DiarioPreferenciaAgrupamentoModule,
    AmbienteModule,
    OfertaFormacaoModule,
    GradeHorarioOfertaFormacaoModule,
    ImagemModule,
    OfertaFormacaoNivelFormacaoModule,
    EtapaModule,
    BlocoModule,
    AutenticacaoModule,
    DiarioModule,
    TurmaModule,
    // GerarHorarioModule,
    DiaCalendarioModule,
    EnderecoModule,
    EstadoModule,
    TurmaDisponibilidadeModule,
    HealthModule,
    HorarioGeradoAulaModule,
    DiarioProfessorModule,
  ],
})
export class ResourcesModule {}
