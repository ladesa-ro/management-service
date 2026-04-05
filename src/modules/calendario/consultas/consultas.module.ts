import { Module } from "@nestjs/common";
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import { ConsultaOcorrenciasPorDataQueryHandlerImpl } from "./application/queries";
import { IConsultaOcorrenciasPorDataQueryHandler } from "./domain/queries";
import { ConsultasRestController } from "./presentation.rest/consultas.rest.controller";
import { ProfessorAgendaRestController } from "./presentation.rest/professor-agenda.rest.controller";

@Module({
  imports: [CalendarioAgendamentoModule],
  controllers: [ConsultasRestController, ProfessorAgendaRestController],
  providers: [
    {
      provide: IConsultaOcorrenciasPorDataQueryHandler,
      useClass: ConsultaOcorrenciasPorDataQueryHandlerImpl,
    },
  ],
})
export class ConsultasModule {}
