import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/infrastructure/integrations/message-broker";
import { GerarHorarioController } from "@/v2/adapters/in/http/gerar-horario/gerar-horario.controller";
import { GerarHorarioService } from "@/v2/core/gerar-horario/application/use-cases/gerar-horario.service";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
