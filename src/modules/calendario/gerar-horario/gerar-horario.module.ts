import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/infrastructure.message-broker";
import {
  GerarHorarioAceitarCommandHandlerImpl,
  GerarHorarioCreateCommandHandlerImpl,
  GerarHorarioPublishTimetableRequestCommandHandlerImpl,
  GerarHorarioRejeitarCommandHandlerImpl,
} from "@/modules/calendario/gerar-horario/application/commands";
import { GerarHorarioFindOneQueryHandlerImpl } from "@/modules/calendario/gerar-horario/application/queries";
import {
  IGerarHorarioAceitarCommandHandler,
  IGerarHorarioCreateCommandHandler,
  IGerarHorarioPublishTimetableRequestCommandHandler,
  IGerarHorarioRejeitarCommandHandler,
} from "@/modules/calendario/gerar-horario/domain/commands";
import { IGerarHorarioFindOneQueryHandler } from "@/modules/calendario/gerar-horario/domain/queries";
import { IGerarHorarioRepository } from "@/modules/calendario/gerar-horario/domain/repositories";
import { GerarHorarioTypeOrmRepositoryAdapter } from "@/modules/calendario/gerar-horario/infrastructure.database";
import { GerarHorarioRestController } from "@/modules/calendario/gerar-horario/presentation.rest";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [
    // Repositories
    {
      provide: IGerarHorarioRepository,
      useClass: GerarHorarioTypeOrmRepositoryAdapter,
    },
    // Commands
    {
      provide: IGerarHorarioPublishTimetableRequestCommandHandler,
      useClass: GerarHorarioPublishTimetableRequestCommandHandlerImpl,
    },
    {
      provide: IGerarHorarioCreateCommandHandler,
      useClass: GerarHorarioCreateCommandHandlerImpl,
    },
    {
      provide: IGerarHorarioAceitarCommandHandler,
      useClass: GerarHorarioAceitarCommandHandlerImpl,
    },
    {
      provide: IGerarHorarioRejeitarCommandHandler,
      useClass: GerarHorarioRejeitarCommandHandlerImpl,
    },
    // Queries
    {
      provide: IGerarHorarioFindOneQueryHandler,
      useClass: GerarHorarioFindOneQueryHandlerImpl,
    },
  ],
  exports: [IGerarHorarioPublishTimetableRequestCommandHandler],
})
export class GerarHorarioModule {}
