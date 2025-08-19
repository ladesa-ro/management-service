import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { DiaCalendarioController } from "./api/dia-calendario.controller";
import { DiaCalendarioResolver } from "./dia-calendario.resolver";
import { DiaCalendarioService } from "./domain/dia-calendario.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [DiaCalendarioService, DiaCalendarioResolver],
  controllers: [DiaCalendarioController],
})
export class DiaCalendarioModule {
}
