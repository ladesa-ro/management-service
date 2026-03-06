import { Module } from "@nestjs/common";
import { GerarHorarioService } from "@/Ladesa.Management.Application/horarios/gerar-horario";
import { GerarHorarioRestController } from "@/Ladesa.Management.Application/horarios/gerar-horario/presentation/rest";
import { MessageBrokerModule } from "@/Ladesa.Management.Application/horarios/infrastructure/message-broker";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
