import { Module } from "@nestjs/common";
import { GerarHorarioService } from "@/modules/horarios/gerar-horario";
import { GerarHorarioRestController } from "@/modules/horarios/gerar-horario/presentation/rest";
import { MessageBrokerModule } from "@/modules/horarios/infrastructure/message-broker";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
