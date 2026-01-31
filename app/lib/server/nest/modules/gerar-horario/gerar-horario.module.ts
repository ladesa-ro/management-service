import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/modules/@shared/infrastructure/message-broker";
import { GerarHorarioService } from "@/modules/gerar-horario";
import { GerarHorarioRestController } from "./rest";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
