import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/shared/infrastructure/integrations/message-broker";
import { GerarHorarioController } from "./api/gerar-horario.controller";
import { GerarHorarioService } from "./domain/gerar-horario.service";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
