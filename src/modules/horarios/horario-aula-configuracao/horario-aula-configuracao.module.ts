import { Module } from "@nestjs/common";
import { HorarioAulaConfiguracaoRestController } from "./presentation.rest/horario-aula-configuracao.rest.controller";

@Module({
  controllers: [HorarioAulaConfiguracaoRestController],
  providers: [],
  exports: [],
})
export class HorarioAulaConfiguracaoModule {}
