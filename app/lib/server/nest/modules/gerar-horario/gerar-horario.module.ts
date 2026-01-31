import { Module } from "@nestjs/common";
import { GerarHorarioService } from "@/modules/gerar-horario";
import { MessageBrokerModule } from "@/v2/old/infrastructure/integrations/message-broker";
import { GerarHorarioRestController } from "./rest";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
