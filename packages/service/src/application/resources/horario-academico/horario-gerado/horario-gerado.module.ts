import { CalendarioLetivoModule } from "@/application/resources/calendario/calendario-letivo/calendario-letivo.module";
import { Module } from "@nestjs/common";
import { HorarioGeradoController } from "./horario-gerado.controller";
import { HorarioGeradoResolver } from "./horario-gerado.resolver";
import { HorarioGeradoService } from "./horario-gerado.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [HorarioGeradoService, HorarioGeradoResolver],
  controllers: [HorarioGeradoController],
  exports: [HorarioGeradoService],
})
export class HorarioGeradoModule {}
