import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/features/ambiente/ambiente.module";
import { ArquivoModule } from "@/features/arquivo/arquivo.module";
import { AulaModule } from "@/features/aula/aula.module";
import { AutenticacaoModule } from "@/features/autenticacao/autenticacao.module";
import { AutorizacaoModule } from "@/features/autorizacao/autorizacao.module";
import { BlocoModule } from "@/features/bloco/bloco.module";
import { CalendarioLetivoModule } from "@/features/calendario-letivo/calendario-letivo.module";
import { CampusModule } from "@/features/campus/campus.module";
import { CidadeModule } from "@/features/cidade/cidade.module";
import { CursoModule } from "@/features/curso/curso.module";
import { DiaCalendarioModule } from "@/features/dia-calendario/dia-calendario.module";
import { DiarioModule } from "@/features/diario/diario.module";
import { DiarioPreferenciaAgrupamentoModule } from "@/features/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/features/diario-professor/diario-professor.module";
import { DisciplinaModule } from "@/features/disciplina/disciplina.module";
import { DisponibilidadeModule } from "@/features/disponibilidade/disponibilidade.module";
import { EnderecoModule } from "@/features/endereco/endereco.module";
import { EstadoModule } from "@/features/estado/estado.module";
import { EtapaModule } from "@/features/etapa/etapa.module";
import { EventoModule } from "@/features/evento/evento.module";
import { GradeHorarioOfertaFormacaoModule } from "@/features/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/features/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HealthModule } from "@/features/health/health.module";
import { HorarioGeradoModule } from "@/features/horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/features/horario-gerado-aula/horario-gerado-aula.module";
import { ImagemModule } from "@/features/imagem/imagem.module";
import { ImagemArquivoModule } from "@/features/imagem-arquivo/imagem-arquivo.module";
import { IntervaloDeTempoModule } from "@/features/intervalo-de-tempo/intervalo-de-tempo.module";
import { ModalidadeModule } from "@/features/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/features/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/features/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/features/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { PerfilModule } from "@/features/perfil/perfil.module";
import { ProfessorIndisponibilidadeModule } from "@/features/professor-indisponibilidade/professor-indisponibilidade.module";
import { ReservaModule } from "@/features/reserva/reserva.module";
import { TurmaModule } from "@/features/turma/turma.module";
import { TurmaDisponibilidadeModule } from "@/features/turma-disponibilidade/turma-disponibilidade.module";
import { UsuarioModule } from "@/features/usuario/usuario.module";

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
