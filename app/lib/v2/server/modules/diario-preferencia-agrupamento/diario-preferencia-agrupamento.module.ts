import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoService } from "@/v2/core/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import { DiarioModule } from "@/v2/server/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { DiarioPreferenciaAgrupamentoController } from "./http";

@Module({
  imports: [DiarioModule, IntervaloDeTempoModule],
  providers: [DiarioPreferenciaAgrupamentoService],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
