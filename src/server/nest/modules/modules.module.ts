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
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import { CalendarioColecaoModule } from "@/modules/calendario/colecao/calendario-colecao.module";
import { ConsultasModule } from "@/modules/calendario/consultas/consultas.module";
import { GerarHorarioModule } from "@/modules/calendario/gerar-horario/gerar-horario.module";
import { GradeHorariaModule } from "@/modules/calendario/grade-horaria/grade-horaria.module";
import { HorarioConsultaModule } from "@/modules/calendario/horario-consulta/horario-consulta.module";
import { HorarioEdicaoModule } from "@/modules/calendario/horario-edicao/horario-edicao.module";
import { CalendarioIndisponibilidadeAmbienteModule } from "@/modules/calendario/indisponibilidade-ambiente/calendario-indisponibilidade-ambiente.module";
import { CalendarioIndisponibilidadeProfessorModule } from "@/modules/calendario/indisponibilidade-professor/calendario-indisponibilidade-professor.module";
import { CalendarioLetivoModule } from "@/modules/calendario/letivo/calendario-letivo.module";
import { CalendarioSolicitacaoMudancaModule } from "@/modules/calendario/solicitacao-mudanca/calendario-solicitacao-mudanca.module";
import { TurmaDisponibilidadeModule } from "@/modules/calendario/turmas/disponibilidade/turma-disponibilidade.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { ModalidadeModule } from "@/modules/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";
import { TurmaMatriculaModule } from "@/modules/ensino/turma/matricula/turma-matricula.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { EmpresaModule } from "@/modules/estagio/empresa/empresa.module";
import { EmpresaAvaliacaoModule } from "@/modules/estagio/empresa-avaliacao/empresa-avaliacao.module";
import { EstagiarioModule } from "@/modules/estagio/estagiario/estagiario.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import { FolhaPontoModule } from "@/modules/estagio/folha-ponto/folha-ponto.module";
import { RelatorioEstagioModule } from "@/modules/estagio/relatorio/relatorio.module";
import { CidadeModule } from "@/modules/localidades/cidade/cidade.module";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";
import { EstadoModule } from "@/modules/localidades/estado/estado.module";
import { RelatorioModule } from "@/modules/relatorios/relatorio/relatorio.module";
import { NotificationsModule } from "@/notifications/notifications.module";

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
    CalendarioColecaoModule,
    ConsultasModule,
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
    TurmaMatriculaModule,
    GerarHorarioModule,
    HorarioConsultaModule,
    HorarioEdicaoModule,
    CalendarioSolicitacaoMudancaModule,
    CalendarioIndisponibilidadeProfessorModule,
    CalendarioIndisponibilidadeAmbienteModule,
    EnderecoModule,
    EstadoModule,
    EmpresaModule,
    EmpresaAvaliacaoModule,
    EstagioModule,
    EstagiarioModule,
    FolhaPontoModule,
    NotificacaoModule,
    RelatorioModule,
    RelatorioEstagioModule,
    GradeHorariaModule,
    TurmaDisponibilidadeModule,
    NotificationsModule,
  ],
})
export class ModulesModule {}
