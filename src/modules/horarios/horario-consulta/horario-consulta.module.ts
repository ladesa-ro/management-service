import { Module } from "@nestjs/common";
import { HorarioConsultaQueryHandlerImpl } from "./application/queries";
import { IHorarioConsultaQueryHandler } from "./domain/queries";
import { HorarioConsultaRestController } from "./presentation.rest/horario-consulta.rest.controller";

@Module({
  controllers: [HorarioConsultaRestController],
  providers: [
    {
      provide: IHorarioConsultaQueryHandler,
      useClass: HorarioConsultaQueryHandlerImpl,
    },
  ],
  exports: [IHorarioConsultaQueryHandler],
})
export class HorarioConsultaModule {}
