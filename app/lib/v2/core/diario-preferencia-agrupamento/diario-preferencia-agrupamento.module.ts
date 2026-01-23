import { Module } from "@nestjs/common";
import { DiarioModule } from "@/v2/core/diario/diario.module";
import { DiarioPreferenciaAgrupamentoController } from "./api/diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoService } from "./domain/diario-preferencia-agrupamento.service";

@Module({
  imports: [DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
