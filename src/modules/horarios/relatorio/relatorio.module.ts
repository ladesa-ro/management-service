import { Module } from "@nestjs/common";
import { RelatorioRestController } from "./presentation.rest/relatorio.rest.controller";

@Module({
  controllers: [RelatorioRestController],
  providers: [],
  exports: [],
})
export class RelatorioModule {}
