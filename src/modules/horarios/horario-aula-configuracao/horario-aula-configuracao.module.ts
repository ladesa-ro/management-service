import { Module } from "@nestjs/common";
import { IHorarioAulaConfiguracaoRepository } from "./domain/repositories";
import { HorarioAulaConfiguracaoTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { HorarioAulaConfiguracaoRestController } from "./presentation.rest/horario-aula-configuracao.rest.controller";

@Module({
  controllers: [HorarioAulaConfiguracaoRestController],
  providers: [
    {
      provide: IHorarioAulaConfiguracaoRepository,
      useClass: HorarioAulaConfiguracaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [],
})
export class HorarioAulaConfiguracaoModule {}
