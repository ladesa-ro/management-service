import { Module } from "@nestjs/common";
import { AutenticacaoModule } from "@/Ladesa.Management.Application/acesso/autenticacao/autenticacao.module";
import { PerfilModule } from "@/Ladesa.Management.Application/acesso/perfil/perfil.module";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import { BlocoModule } from "@/Ladesa.Management.Application/ambientes/bloco/bloco.module";
import { CampusModule } from "@/Ladesa.Management.Application/ambientes/campus/campus.module";
import { ReservaModule } from "@/Ladesa.Management.Application/ambientes/reserva/reserva.module";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/Ladesa.Management.Application/armazenamento/imagem/imagem.module";
import { ImagemArquivoModule } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/imagem-arquivo.module";
import { CursoModule } from "@/Ladesa.Management.Application/ensino/curso/curso.module";
import { DiarioModule } from "@/Ladesa.Management.Application/ensino/diario/diario.module";
import { DiarioPreferenciaAgrupamentoModule } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DiarioProfessorModule } from "@/Ladesa.Management.Application/ensino/diario-professor/diario-professor.module";
import { DisciplinaModule } from "@/Ladesa.Management.Application/ensino/disciplina/disciplina.module";
import { DisponibilidadeModule } from "@/Ladesa.Management.Application/ensino/disponibilidade/disponibilidade.module";
import { EtapaModule } from "@/Ladesa.Management.Application/ensino/etapa/etapa.module";
import { ModalidadeModule } from "@/Ladesa.Management.Application/ensino/modalidade/modalidade.module";
import { NivelFormacaoModule } from "@/Ladesa.Management.Application/ensino/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao/oferta-formacao.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { ProfessorIndisponibilidadeModule } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/professor-indisponibilidade.module";
import { TurmaModule } from "@/Ladesa.Management.Application/ensino/turma/turma.module";
import { TurmaDisponibilidadeModule } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/turma-disponibilidade.module";
import { EmpresaModule } from "@/Ladesa.Management.Application/estagio/empresa/empresa.module";
import { AulaModule } from "@/Ladesa.Management.Application/horarios/aula/aula.module";
import { CalendarioLetivoModule } from "@/Ladesa.Management.Application/horarios/calendario-letivo/calendario-letivo.module";
import { DiaCalendarioModule } from "@/Ladesa.Management.Application/horarios/dia-calendario/dia-calendario.module";
import { EventoModule } from "@/Ladesa.Management.Application/horarios/evento/evento.module";
import { GerarHorarioModule } from "@/Ladesa.Management.Application/horarios/gerar-horario/gerar-horario.module";
import { GradeHorarioOfertaFormacaoModule } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { HorarioGeradoModule } from "@/Ladesa.Management.Application/horarios/horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/horario-gerado-aula.module";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { CidadeModule } from "@/Ladesa.Management.Application/localidades/cidade/cidade.module";
import { EnderecoModule } from "@/Ladesa.Management.Application/localidades/endereco/endereco.module";
import { EstadoModule } from "@/Ladesa.Management.Application/localidades/estado/estado.module";
import { AppConfigModule } from "@/Ladesa.Management.Infrastructure.Config";

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
    EmpresaModule,
    TurmaDisponibilidadeModule,
    HorarioGeradoAulaModule,
    DiarioProfessorModule,
  ],
})
export class ModulesModule {}
