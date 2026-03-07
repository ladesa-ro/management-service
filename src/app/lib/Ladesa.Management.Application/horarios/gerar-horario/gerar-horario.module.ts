import { Module } from "@nestjs/common";
import { GerarHorarioService } from "@/Ladesa.Management.Application/horarios/gerar-horario";
import { MessageBrokerModule } from "@/Ladesa.Management.Application/horarios/infrastructure/message-broker";
import { GerarHorarioRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/GerarHorarioRestController";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
