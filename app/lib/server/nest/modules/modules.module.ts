import { Module } from "@nestjs/common";
import { CidadeModule } from "@/server/nest/modules/cidade";
import { EstadoModule } from "@/server/nest/modules/estado/estado.module";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { AulaModule } from "@/v2/server/modules/aula";
import { AutenticacaoModule } from "@/v2/server/modules/autenticacao";
import { AutorizacaoModule } from "@/v2/server/modules/autorizacao";
import { BlocoModule } from "@/server/nest/modules/bloco";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { CursoModule } from "@/server/nest/modules/curso";
import { DiaCalendarioModule } from "@/server/nest/modules/dia-calendario";
import { DiarioModule } from "@/v2/server/modules/diario";
import { DiarioPreferenciaAgrupamentoModule } from "@/v2/server/modules/diario-preferencia-agrupamento";
import { DiarioProfessorModule } from "@/v2/server/modules/diario-professor";
import { DisciplinaModule } from "@/v2/server/modules/disciplina";
import { DisponibilidadeModule } from "@/server/nest/modules/disponibilidade";
import { EnderecoModule } from "@/v2/server/modules/endereco";
import { EtapaModule } from "@/server/nest/modules/etapa";
import { EventoModule } from "@/v2/server/modules/evento";
import { GradeHorarioOfertaFormacaoModule } from "@/server/nest/modules/grade-horario-oferta-formacao";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/server/nest/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { HealthModule } from "@/server/nest/modules/health";
import { HorarioGeradoModule } from "@/server/nest/modules/horario-gerado";
import { HorarioGeradoAulaModule } from "@/v2/server/modules/horario-gerado-aula";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { ImagemArquivoModule } from "@/v2/server/modules/imagem-arquivo";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { ModalidadeModule } from "@/server/nest/modules/modalidade";
import { NivelFormacaoModule } from "@/server/nest/modules/nivel-formacao";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { OfertaFormacaoNivelFormacaoModule } from "@/v2/server/modules/oferta-formacao-nivel-formacao";
import { PerfilModule } from "@/server/nest/modules/perfil";
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
export class ModulesModule {}
