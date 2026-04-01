import { Module } from "@nestjs/common";
import { GradeHorariaPermissionCheckerImpl } from "./application/authorization";
import { GradeHorariaReplaceCommandHandlerImpl } from "./application/commands";
import { GradeHorariaFindByCampusQueryHandlerImpl } from "./application/queries";
import { IGradeHorariaPermissionChecker } from "./domain/authorization";
import { IGradeHorariaReplaceCommandHandler } from "./domain/commands";
import { IGradeHorariaFindByCampusQueryHandler } from "./domain/queries";
import { IGradeHorariaRepository } from "./domain/repositories";
import { GradeHorariaTypeOrmRepositoryAdapter } from "./infrastructure.database";
import { GradeHorariaRestController } from "./presentation.rest/grade-horaria.rest.controller";

@Module({
  controllers: [GradeHorariaRestController],
  providers: [
    {
      provide: IGradeHorariaPermissionChecker,
      useClass: GradeHorariaPermissionCheckerImpl,
    },
    {
      provide: IGradeHorariaRepository,
      useClass: GradeHorariaTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IGradeHorariaReplaceCommandHandler,
      useClass: GradeHorariaReplaceCommandHandlerImpl,
    },

    // Queries
    {
      provide: IGradeHorariaFindByCampusQueryHandler,
      useClass: GradeHorariaFindByCampusQueryHandlerImpl,
    },
  ],
  exports: [],
})
export class GradeHorariaModule {}
