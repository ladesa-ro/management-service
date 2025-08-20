import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "@/features/calendario-letivo/calendario-letivo.module";
import { HorarioGeradoController } from "./api/horario-gerado.controller";
import { HorarioGeradoService } from "./domain/horario-gerado.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
