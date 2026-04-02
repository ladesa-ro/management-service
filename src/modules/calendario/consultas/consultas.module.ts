import { Module } from "@nestjs/common";
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import { ConsultaAgendamentosPorDataQueryHandlerImpl } from "./application/queries";
import { IConsultaAgendamentosPorDataQueryHandler } from "./domain/queries";
import { ConsultasRestController } from "./presentation.rest/consultas.rest.controller";

@Module({
  imports: [CalendarioAgendamentoModule],
  controllers: [ConsultasRestController],
  providers: [
    {
      provide: IConsultaAgendamentosPorDataQueryHandler,
      useClass: ConsultaAgendamentosPorDataQueryHandlerImpl,
    },
  ],
})
export class ConsultasModule {}
