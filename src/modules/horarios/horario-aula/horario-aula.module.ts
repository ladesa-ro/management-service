import { Module } from "@nestjs/common";
import { HorarioAulaRestController } from "./presentation.rest/horario-aula.rest.controller";

@Module({
  controllers: [HorarioAulaRestController],
  providers: [],
  exports: [],
})
export class HorarioAulaModule {}
