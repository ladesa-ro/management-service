import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/v2/server/modules/ambiente";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { AulaModule } from "@/v2/server/modules/aula";
import { AutenticacaoModule } from "@/v2/server/modules/autenticacao";
import { AutorizacaoModule } from "@/v2/server/modules/autorizacao";
import { BlocoModule } from "@/v2/server/modules/bloco";
import { CalendarioLetivoModule } from "@/v2/server/modules/calendario-letivo";
import { CampusModule } from "@/v2/server/modules/campus";
import { CidadeModule } from "@/v2/server/modules/cidade";
import { CursoModule } from "@/v2/server/modules/curso";
import { DiaCalendarioModule } from "@/v2/server/modules/dia-calendario";
import { DiarioModule } from "@/v2/server/modules/diario";
import { DiarioPreferenciaAgrupamentoModule } from "@/v2/server/modules/diario-preferencia-agrupamento";
import { DiarioProfessorModule } from "@/v2/server/modules/diario-professor";
import { DisciplinaModule } from "@/v2/server/modules/disciplina";
import { DisponibilidadeModule } from "@/v2/server/modules/disponibilidade";
import { EnderecoModule } from "@/v2/server/modules/endereco";
import { EstadoModule } from "@/server/nest/modules/estado/estado.module";
import { EtapaModule } from "@/v2/server/modules/etapa";
import { EventoModule } from "@/v2/server/modules/evento";
import { GradeHorarioOfertaFormacaoModule } from "@/v2/server/modules/grade-horario-oferta-formacao";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoModule
} from "@/v2/server/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { HealthModule } from "@/v2/server/modules/health";
import { HorarioGeradoModule } from "@/v2/server/modules/horario-gerado";
import { HorarioGeradoAulaModule } from "@/v2/server/modules/horario-gerado-aula";
import { ImagemModule } from "@/v2/server/modules/imagem";
import { ImagemArquivoModule } from "@/v2/server/modules/imagem-arquivo";
import { IntervaloDeTempoModule } from "@/v2/server/modules/intervalo-de-tempo";
import { ModalidadeModule } from "@/v2/server/modules/modalidade";
import { NivelFormacaoModule } from "@/v2/server/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { OfertaFormacaoNivelFormacaoModule } from "@/v2/server/modules/oferta-formacao-nivel-formacao";
import { PerfilModule } from "@/v2/server/modules/perfil";
import { ProfessorIndisponibilidadeModule } from "@/v2/server/modules/professor-indisponibilidade";
import { ReservaModule } from "@/v2/server/modules/reserva";
import { TurmaModule } from "@/v2/server/modules/turma";
import { TurmaDisponibilidadeModule } from "@/v2/server/modules/turma-disponibilidade";
import { UsuarioModule } from "@/v2/server/modules/usuario";

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
export class ModulesModule {
}
