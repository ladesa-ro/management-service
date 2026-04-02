import { Module } from "@nestjs/common";
import { IRelatorioRepository } from "./domain/repositories";
import { RelatorioTypeOrmRepositoryAdapter } from "./infrastructure.database/relatorio.repository";
import { RelatorioRestController } from "./presentation.rest/relatorio.rest.controller";

@Module({
  controllers: [RelatorioRestController],
  providers: [
    {
      provide: IRelatorioRepository,
      useClass: RelatorioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [],
})
export class RelatorioModule {}
