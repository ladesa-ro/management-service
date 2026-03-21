import { Module } from "@nestjs/common";
import { IHorarioAulaRepository } from "./domain/repositories";
import { HorarioAulaTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { HorarioAulaRestController } from "./presentation.rest/horario-aula.rest.controller";

@Module({
  controllers: [HorarioAulaRestController],
  providers: [
    {
      provide: IHorarioAulaRepository,
      useClass: HorarioAulaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [],
})
export class HorarioAulaModule {}
