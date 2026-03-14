import { Module } from "@nestjs/common";
import { GerarHorarioPublishTimetableRequestCommandHandlerImpl } from "@/modules/horarios/gerar-horario/application/commands";
import { IGerarHorarioPublishTimetableRequestCommandHandler } from "@/modules/horarios/gerar-horario/domain/commands";
import { GerarHorarioRestController } from "@/modules/horarios/gerar-horario/presentation/rest";
import { MessageBrokerModule } from "@/modules/horarios/infrastructure/message-broker";

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
