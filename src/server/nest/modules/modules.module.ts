import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/infrastructure.config";
import { AutenticacaoModule } from "@/modules/acesso/autenticacao/autenticacao.module";
import { NotificacaoModule } from "@/modules/acesso/notificacao/notificacao.module";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { BlocoModule } from "@/modules/ambientes/bloco/bloco.module";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { ImagemArquivoModule } from "@/modules/armazenamento/imagem-arquivo/imagem-arquivo.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import { CalendarioAgendamentoModule } from "@/modules/horarios/calendario-agendamento/calendario-agendamento.module";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";
import { GerarHorarioModule } from "@/modules/horarios/gerar-horario/gerar-horario.module";
import { GradeHorariaModule } from "@/modules/horarios/grade-horaria/grade-horaria.module";
import { HorarioConsultaModule } from "@/modules/horarios/horario-consulta/horario-consulta.module";
import { HorarioEdicaoModule } from "@/modules/horarios/horario-edicao/horario-edicao.module";
import { RelatorioModule } from "@/modules/horarios/relatorio/relatorio.module";
import { CidadeModule } from "@/modules/localidades/cidade/cidade.module";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";
import { EstadoModule } from "@/modules/localidades/estado/estado.module";

@Module({
  imports: [
    AppConfigModule,
    ModalidadeModule,
    CursoModule,
    UsuarioModule,
    DisciplinaModule,
    CampusModule,
    ArquivoModule,
    CalendarioAgendamentoModule,
    CalendarioLetivoModule,
    ImagemArquivoModule,
    CidadeModule,
    NivelFormacaoModule,
    AmbienteModule,
    OfertaFormacaoModule,
    ImagemModule,
    BlocoModule,
    AutenticacaoModule,
    DiarioModule,
    TurmaModule,
    GerarHorarioModule,
    HorarioConsultaModule,
    HorarioEdicaoModule,
    EnderecoModule,
    EstadoModule,
    EmpresaModule,
    EstagioModule,
    EstagiarioModule,
    NotificacaoModule,
    RelatorioModule,
    GradeHorariaModule,
  ],
})
export class ModulesModule {}
