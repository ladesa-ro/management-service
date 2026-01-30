import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoService } from "@/core/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { DiarioPreferenciaAgrupamentoController } from "./rest";

@Module({
  imports: [DiarioModule, IntervaloDeTempoModule],
  providers: [DiarioPreferenciaAgrupamentoService],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
