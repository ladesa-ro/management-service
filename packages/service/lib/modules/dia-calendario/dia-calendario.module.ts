import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { DiaCalendarioController } from "./api/dia-calendario.controller";
import { DiaCalendarioService } from "./domain/dia-calendario.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [DiaCalendarioService],
  controllers: [DiaCalendarioController],
})
export class DiaCalendarioModule {}
