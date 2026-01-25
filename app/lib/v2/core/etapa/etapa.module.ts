import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "../calendario-letivo/calendario-letivo.module";
import { EtapaController } from "@/v2/adapters/in/http/etapa/etapa.controller";
import { EtapaService } from "@/v2/core/etapa/application/use-cases/etapa.service";

@Module({
  imports: [CalendarioLetivoModule],
  providers: [EtapaService],
  controllers: [EtapaController],
  exports: [EtapaService],
})
export class EtapaModule {}
