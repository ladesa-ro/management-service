import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/modules/@shared/infrastructure/config";
import { AutenticacaoModule } from "@/modules/acesso/autenticacao/autenticacao.module";
import { PerfilModule } from "@/modules/acesso/perfil/perfil.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { BlocoModule } from "@/modules/ambientes/bloco/bloco.module";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ReservaModule } from "@/modules/ambientes/reserva/reserva.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { ImagemArquivoModule } from "@/modules/armazenamento/imagem-arquivo/imagem-arquivo.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import { DiarioPreferenciaAgrupamentoModule } from "@/modules/ensino/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/modules/ensino/diario-professor/diario-professor.module";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { DisponibilidadeModule } from "@/modules/ensino/disponibilidade/disponibilidade.module";
import { EtapaModule } from "@/modules/ensino/etapa/etapa.module";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/modules/ensino/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { ProfessorIndisponibilidadeModule } from "@/modules/ensino/professor-indisponibilidade/professor-indisponibilidade.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { TurmaDisponibilidadeModule } from "@/modules/ensino/turma-disponibilidade/turma-disponibilidade.module";
import { AulaModule } from "@/modules/horarios/aula/aula.module";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import { DiaCalendarioModule } from "@/modules/horarios/dia-calendario/dia-calendario.module";
import { EventoModule } from "@/modules/horarios/evento/evento.module";
import { GerarHorarioModule } from "@/modules/horarios/gerar-horario/gerar-horario.module";
import { GradeHorarioOfertaFormacaoModule } from "@/modules/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HorarioGeradoModule } from "@/modules/horarios/horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/modules/horarios/horario-gerado-aula/horario-gerado-aula.module";
import { IntervaloDeTempoModule } from "@/modules/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { CidadeModule } from "@/modules/localidades/cidade/cidade.module";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";
import { EstadoModule } from "@/modules/localidades/estado/estado.module";

@Module({
  imports: [
    AppConfigModule,
    ModalidadeModule,
    PerfilModule,
    ProfessorIndisponibilidadeModule,
    CursoModule,
    IntervaloDeTempoModule,
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
    GerarHorarioModule,
    DiaCalendarioModule,
    EnderecoModule,
    EstadoModule,
    TurmaDisponibilidadeModule,
    HorarioGeradoAulaModule,
    DiarioProfessorModule,
  ],
})
export class ModulesModule {}
