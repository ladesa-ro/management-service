import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/modules/ambiente/ambiente.module";
import { ArquivoModule } from "@/modules/arquivo/arquivo.module";
import { AulaModule } from "@/modules/aula/aula.module";
import { AutenticacaoModule } from "@/modules/autenticacao/autenticacao.module";
import { AutorizacaoModule } from "@/modules/autorizacao/autorizacao.module";
import { BlocoModule } from "@/modules/bloco/bloco.module";
import { CalendarioLetivoModule } from "@/modules/calendario-letivo/calendario-letivo.module";
import { CampusModule } from "@/modules/campus/campus.module";
import { CidadeModule } from "@/modules/cidade/cidade.module";
import { CursoModule } from "@/modules/curso/curso.module";
import { DiaCalendarioModule } from "@/modules/dia-calendario/dia-calendario.module";
import { DiarioModule } from "@/modules/diario/diario.module";
import {
  DiarioPreferenciaAgrupamentoModule
} from "@/modules/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/modules/diario-professor/diario-professor.module";
import { DisciplinaModule } from "@/modules/disciplina/disciplina.module";
import { DisponibilidadeModule } from "@/modules/disponibilidade/disponibilidade.module";
import { EnderecoModule } from "@/modules/endereco/endereco.module";
import { EstadoModule } from "@/modules/estado/estado.module";
import { EtapaModule } from "@/modules/etapa/etapa.module";
import { EventoModule } from "@/modules/evento/evento.module";
import {
  GradeHorarioOfertaFormacaoModule
} from "@/modules/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoModule
} from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HealthModule } from "@/modules/health/health.module";
import { HorarioGeradoModule } from "@/modules/horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/modules/horario-gerado-aula/horario-gerado-aula.module";
import { ImagemModule } from "@/modules/imagem/imagem.module";
import { ImagemArquivoModule } from "@/modules/imagem-arquivo/imagem-arquivo.module";
import { IntervaloDeTempoModule } from "@/modules/intervalo-de-tempo/intervalo-de-tempo.module";
import { ModalidadeModule } from "@/modules/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/oferta-formacao/oferta-formacao.module";
import {
  OfertaFormacaoNivelFormacaoModule
} from "@/modules/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { PerfilModule } from "@/modules/perfil/perfil.module";
import { ProfessorDisponibilidadeModule } from "@/modules/professor-disponibilidade/professor-disponibilidade.module";
import { ReservaModule } from "@/modules/reserva/reserva.module";
import { TurmaModule } from "@/modules/turma/turma.module";
import { TurmaDisponibilidadeModule } from "@/modules/turma-disponibilidade/turma-disponibilidade.module";
import { UsuarioModule } from "@/modules/usuario/usuario.module";

@Module({
  imports: [
    ModalidadeModule,
    PerfilModule,
    ProfessorDisponibilidadeModule,
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
export class ResourcesModule {
}
