import { DiarioModule } from "@/business-logic/resources/06-ensino-discente/diario/diario.module";
import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoController } from "./diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoResolver } from "./diario-preferencia-agrupamento.resolver";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Module({
  imports: [DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService, DiarioPreferenciaAgrupamentoResolver],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
