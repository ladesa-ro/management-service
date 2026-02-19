import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@/modules/@shared/infrastructure/message-broker";
import { GerarHorarioService } from "@/modules/horarios/gerar-horario";
import { GerarHorarioRestController } from "@/modules/horarios/gerar-horario/presentation/rest";

@Module({
  imports: [MessageBrokerModule],
  controllers: [GerarHorarioRestController],
  providers: [GerarHorarioService],
  exports: [GerarHorarioService],
})
export class GerarHorarioModule {}
