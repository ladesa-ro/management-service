import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoController } from "@/v2/adapters/in/http/diario-preferencia-agrupamento/diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoService } from "@/v2/core/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import { DiarioModule } from "@/v2/server/modules/diario.module";

@Module({
  imports: [DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
