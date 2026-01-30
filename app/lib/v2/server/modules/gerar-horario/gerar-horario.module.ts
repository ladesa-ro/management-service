import { Module } from "@nestjs/common";
import { GerarHorarioService } from "@/v2/core/gerar-horario/application/use-cases/gerar-horario.service";
import { MessageBrokerModule } from "@/v2/old/infrastructure/integrations/message-broker";
import { GerarHorarioController } from "./http";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
