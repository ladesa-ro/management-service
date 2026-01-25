import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/v2/core/arquivo/arquivo.module";
import { AulaModule } from "@/v2/core/aula/aula.module";
import { CalendarioLetivoModule } from "@/v2/core/calendario-letivo/calendario-letivo.module";
import { DiaCalendarioModule } from "@/v2/core/dia-calendario/dia-calendario.module";
import { DiarioModule } from "@/v2/core/diario/diario.module";
import { DiarioPreferenciaAgrupamentoModule } from "@/v2/core/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/v2/core/diario-professor/diario-professor.module";
import { DisponibilidadeModule } from "@/v2/core/disponibilidade/disponibilidade.module";
import { EtapaModule } from "@/v2/core/etapa/etapa.module";
import { EventoModule } from "@/v2/core/evento/evento.module";
import { GradeHorarioOfertaFormacaoModule } from "@/v2/core/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/v2/core/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HealthModule } from "@/v2/core/health/health.module";
import { HorarioGeradoModule } from "@/v2/core/horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/v2/core/horario-gerado-aula/horario-gerado-aula.module";
import { ImagemModule } from "@/v2/core/imagem/imagem.module";
import { ImagemArquivoModule } from "@/v2/core/imagem-arquivo/imagem-arquivo.module";
import { IntervaloDeTempoModule } from "@/v2/core/intervalo-de-tempo/intervalo-de-tempo.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/v2/core/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { ProfessorIndisponibilidadeModule } from "@/v2/core/professor-indisponibilidade/professor-indisponibilidade.module";
import { ReservaModule } from "@/v2/core/reserva/reserva.module";
import { TurmaDisponibilidadeModule } from "@/v2/core/turma-disponibilidade/turma-disponibilidade.module";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { AutenticacaoModule } from "@/v2/server/modules/autenticacao.module";
import { AutorizacaoModule } from "@/v2/server/modules/autorizacao.module";
import { BlocoModule } from "@/v2/server/modules/bloco.module";
import { CampusModule } from "@/v2/server/modules/campus.module";
import { CidadeModule } from "@/v2/server/modules/cidade.module";
import { CursoModule } from "@/v2/server/modules/curso.module";
import { DisciplinaModule } from "@/v2/server/modules/disciplina.module";
import { EnderecoModule } from "@/v2/server/modules/endereco.module";
import { EstadoModule } from "@/v2/server/modules/estado.module";
import { ModalidadeModule } from "@/v2/server/modules/modalidade.module";
import { NivelFormacaoModule } from "@/v2/server/modules/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao.module";
import { PerfilModule } from "@/v2/server/modules/perfil.module";
import { TurmaModule } from "@/v2/server/modules/turma.module";
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
