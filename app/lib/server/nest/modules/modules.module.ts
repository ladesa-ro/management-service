import { Module } from "@nestjs/common";
import { AutenticacaoModule } from "@/modules/@acesso/autenticacao";
import { AutorizacaoModule } from "@/modules/@acesso/autorizacao";
import { PerfilModule } from "@/modules/@acesso/perfil";
import { UsuarioModule } from "@/modules/@acesso/usuario";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem";
import { ImagemArquivoModule } from "@/modules/@base/armazenamento/imagem-arquivo";
import { CidadeModule } from "@/modules/@base/localidades/cidade";
import { EnderecoModule } from "@/modules/@base/localidades/endereco";
import { EstadoModule } from "@/modules/@base/localidades/estado";
import { AppConfigModule } from "@/modules/@shared/infrastructure/config";
import { AmbienteModule } from "@/modules/ambientes/ambiente";
import { BlocoModule } from "@/modules/ambientes/bloco";
import { CampusModule } from "@/modules/ambientes/campus";
import { ReservaModule } from "@/modules/ambientes/reserva";
import { CursoModule } from "@/modules/ensino/curso";
import { DiarioModule } from "@/modules/ensino/diario";
import { DiarioPreferenciaAgrupamentoModule } from "@/modules/ensino/diario-preferencia-agrupamento";
import { DiarioProfessorModule } from "@/modules/ensino/diario-professor";
import { DisciplinaModule } from "@/modules/ensino/disciplina";
import { DisponibilidadeModule } from "@/modules/ensino/disponibilidade";
import { EtapaModule } from "@/modules/ensino/etapa";
import { ModalidadeModule } from "@/modules/ensino/modalidade";
import { NivelFormacaoModule } from "@/modules/ensino/nivel-formacao";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoNivelFormacaoModule } from "@/modules/ensino/oferta-formacao-nivel-formacao";
import { ProfessorIndisponibilidadeModule } from "@/modules/ensino/professor-indisponibilidade";
import { TurmaModule } from "@/modules/ensino/turma";
import { TurmaDisponibilidadeModule } from "@/modules/ensino/turma-disponibilidade";
import { AulaModule } from "@/modules/horarios/aula";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo";
import { DiaCalendarioModule } from "@/modules/horarios/dia-calendario";
import { EventoModule } from "@/modules/horarios/evento";
import { GerarHorarioModule } from "@/modules/horarios/gerar-horario";
import { GradeHorarioOfertaFormacaoModule } from "@/modules/horarios/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { HorarioGeradoModule } from "@/modules/horarios/horario-gerado";
import { HorarioGeradoAulaModule } from "@/modules/horarios/horario-gerado-aula";
import { IntervaloDeTempoModule } from "@/modules/horarios/intervalo-de-tempo";

@Module({
  imports: [
    AppConfigModule,
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
