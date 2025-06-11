import { CalendarioLetivoModule } from "@/domain/resources/calendario/calendario-letivo/calendario-letivo.module";
import { Module } from "@nestjs/common";
import { HorarioGeradoController } from "./horario-gerado.controller";
import { HorarioGeradoService } from "./horario-gerado.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
