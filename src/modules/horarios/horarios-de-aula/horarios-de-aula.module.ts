import { Module } from "@nestjs/common";
import { HorariosDeAulaPermissionCheckerImpl } from "./application/authorization";
import { HorariosDeAulaReplaceCommandHandlerImpl } from "./application/commands";
import { HorariosDeAulaFindAtualQueryHandlerImpl } from "./application/queries";
import { IHorariosDeAulaPermissionChecker } from "./domain/authorization";
import { IHorariosDeAulaReplaceCommandHandler } from "./domain/commands";
import { IHorariosDeAulaFindAtualQueryHandler } from "./domain/queries";
import { IHorarioAulaConfiguracaoRepository } from "./domain/repositories";
import { HorarioAulaConfiguracaoTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { HorarioDeAulaRestController } from "./presentation.rest/horario-aula-configuracao.rest.controller";

@Module({
  controllers: [HorarioDeAulaRestController],
  providers: [
    {
      provide: IHorariosDeAulaPermissionChecker,
      useClass: HorariosDeAulaPermissionCheckerImpl,
    },
    {
      provide: IHorarioAulaConfiguracaoRepository,
      useClass: HorarioAulaConfiguracaoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IHorariosDeAulaReplaceCommandHandler,
      useClass: HorariosDeAulaReplaceCommandHandlerImpl,
    },

    // Queries
    {
      provide: IHorariosDeAulaFindAtualQueryHandler,
      useClass: HorariosDeAulaFindAtualQueryHandlerImpl,
    },
  ],
  exports: [],
})
export class HorariosDeAulaModule {}
