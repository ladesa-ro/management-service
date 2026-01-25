import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { DiaCalendarioController } from "@/v2/adapters/in/http/dia-calendario/dia-calendario.controller";
import { DiaCalendarioService } from "@/v2/core/dia-calendario/application/use-cases/dia-calendario.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [DiaCalendarioService],
  controllers: [DiaCalendarioController],
})
export class DiaCalendarioModule {}
