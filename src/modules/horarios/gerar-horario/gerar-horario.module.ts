import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/infrastructure.message-broker";
import { GerarHorarioPublishTimetableRequestCommandHandlerImpl } from "@/modules/horarios/gerar-horario/application/commands";
import { IGerarHorarioPublishTimetableRequestCommandHandler } from "@/modules/horarios/gerar-horario/domain/commands";
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
  ],
  exports: [IGerarHorarioPublishTimetableRequestCommandHandler],
})
export class GerarHorarioModule {}
