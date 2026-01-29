import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/old/infrastructure/integrations/message-broker";
import { GerarHorarioService } from "@/v2/core/gerar-horario/application/use-cases/gerar-horario.service";
import { GerarHorarioController } from "./http";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
