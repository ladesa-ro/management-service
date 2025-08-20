import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EtapaController } from "./api/etapa.controller";
import { EtapaService } from "./domain/etapa.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EtapaService],
  controllers: [EtapaController],
  exports: [EtapaService],
})
export class EtapaModule {}
