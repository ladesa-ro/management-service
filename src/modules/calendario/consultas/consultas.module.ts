import { Module } from "@nestjs/common";
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import { CalendarioColecaoModule } from "@/modules/calendario/colecao/calendario-colecao.module";
import { TurmaMatriculaModule } from "@/modules/ensino/turma/matricula/turma-matricula.module";
import {
  CalendarioAgendamentoExportarIcsQueryHandlerImpl,
  CalendarioColecaoMudancasDesdeQueryHandlerImpl,
  CalendarioOcupacaoSemDetalheQueryHandlerImpl,
  ConsultaOcorrenciasPorDataQueryHandlerImpl,
} from "./application/queries";
import {
  ICalendarioAgendamentoExportarIcsQueryHandler,
  ICalendarioColecaoMudancasDesdeQueryHandler,
  ICalendarioOcupacaoSemDetalheQueryHandler,
  IConsultaOcorrenciasPorDataQueryHandler,
} from "./domain/queries";
import { ConsultasRestController } from "./presentation.rest/consultas.rest.controller";
import { ProfessorAgendaRestController } from "./presentation.rest/professor-agenda.rest.controller";

@Module({
  imports: [CalendarioAgendamentoModule, CalendarioColecaoModule, TurmaMatriculaModule],
  controllers: [ConsultasRestController, ProfessorAgendaRestController],
  providers: [
    {
      provide: IConsultaOcorrenciasPorDataQueryHandler,
      useClass: ConsultaOcorrenciasPorDataQueryHandlerImpl,
    },
    {
      provide: ICalendarioOcupacaoSemDetalheQueryHandler,
      useClass: CalendarioOcupacaoSemDetalheQueryHandlerImpl,
    },
    {
      provide: ICalendarioAgendamentoExportarIcsQueryHandler,
      useClass: CalendarioAgendamentoExportarIcsQueryHandlerImpl,
    },
    {
      provide: ICalendarioColecaoMudancasDesdeQueryHandler,
      useClass: CalendarioColecaoMudancasDesdeQueryHandlerImpl,
    },
  ],
})
export class ConsultasModule {}
