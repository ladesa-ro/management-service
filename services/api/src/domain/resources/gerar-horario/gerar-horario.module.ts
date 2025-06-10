import { MessageBrokerModule } from "@/infrastructure/integrations/message-broker";
import { Module } from "@nestjs/common";
import { GerarHorarioController } from "./gerar-horario.controller";
import { GerarHorarioService } from "./gerar-horario.service";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
