import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { AulaModule } from "@/server/nest/modules/aula";
import { AutenticacaoModule } from "@/server/nest/modules/autenticacao";
import { AutorizacaoModule } from "@/server/nest/modules/autorizacao";
import { BlocoModule } from "@/server/nest/modules/bloco";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { CidadeModule } from "@/server/nest/modules/cidade";
import { AppConfigModule } from "@/server/nest/modules/config";
import { CursoModule } from "@/server/nest/modules/curso";
import { DiaCalendarioModule } from "@/server/nest/modules/dia-calendario";
import { DiarioModule } from "@/server/nest/modules/diario";
import { DiarioPreferenciaAgrupamentoModule } from "@/server/nest/modules/diario-preferencia-agrupamento";
import { DiarioProfessorModule } from "@/server/nest/modules/diario-professor";
import { DisciplinaModule } from "@/server/nest/modules/disciplina";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { EnderecoModule } from "@/server/nest/modules/endereco";
import { EstadoModule } from "@/server/nest/modules/estado/estado.module";
import { EtapaModule } from "@/server/nest/modules/etapa";
import { EventoModule } from "@/server/nest/modules/evento";
// import { GerarHorarioModule } from "@/server/nest/modules/gerar-horario";
import { GradeHorarioOfertaFormacaoModule } from "@/server/nest/modules/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/server/nest/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { HealthModule } from "@/server/nest/modules/health";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { HorarioGeradoAulaModule } from "@/server/nest/modules/horario-gerado-aula";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { ImagemArquivoModule } from "@/server/nest/modules/imagem-arquivo";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { ModalidadeModule } from "@/server/nest/modules/modalidade";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { OfertaFormacaoNivelFormacaoModule } from "@/server/nest/modules/oferta-formacao-nivel-formacao";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { ProfessorIndisponibilidadeModule } from "@/server/nest/modules/professor-indisponibilidade";
import { ReservaModule } from "@/server/nest/modules/reserva";
import { TurmaModule } from "@/server/nest/modules/turma";
import { TurmaDisponibilidadeModule } from "@/server/nest/modules/turma-disponibilidade";
import { UsuarioModule } from "@/server/nest/modules/usuario";

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
export class ModulesModule {}
