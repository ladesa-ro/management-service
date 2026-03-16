import { Module } from "@nestjs/common";
import { CalendarioEventoRestController } from "./presentation.rest/calendario-evento.rest.controller";

@Module({
  controllers: [CalendarioEventoRestController],
  providers: [],
  exports: [],
})
export class CalendarioAgendamentoModule {}
