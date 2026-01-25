import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/v2/core/calendario-letivo/calendario-letivo.module";
import { HorarioGeradoController } from "@/v2/adapters/in/http/horario-gerado/horario-gerado.controller";
import { HorarioGeradoService } from "@/v2/core/horario-gerado/application/use-cases/horario-gerado.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
