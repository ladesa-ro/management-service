import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/infrastructure.message-broker";
import {
  GerarHorarioPublishTimetableRequestCommandHandlerImpl,
  GerarHorarioCreateCommandHandlerImpl,
  GerarHorarioAceitarCommandHandlerImpl,
  GerarHorarioRejeitarCommandHandlerImpl,
} from "@/modules/horarios/gerar-horario/application/commands";
import { GerarHorarioFindOneQueryHandlerImpl } from "@/modules/horarios/gerar-horario/application/queries";
import {
  IGerarHorarioPublishTimetableRequestCommandHandler,
  IGerarHorarioCreateCommandHandler,
  IGerarHorarioAceitarCommandHandler,
  IGerarHorarioRejeitarCommandHandler,
} from "@/modules/horarios/gerar-horario/domain/commands";
import { IGerarHorarioFindOneQueryHandler } from "@/modules/horarios/gerar-horario/domain/queries";
import { GerarHorarioRestController } from "@/modules/horarios/gerar-horario/presentation.rest";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [
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
