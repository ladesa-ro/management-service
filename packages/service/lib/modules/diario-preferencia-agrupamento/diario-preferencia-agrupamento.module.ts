import { Module } from "@nestjs/common";
import { DiarioModule } from "@/legacy/application/resources/ensino/discente/diario/diario.module";
import { DiarioPreferenciaAgrupamentoController } from "./api/diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoResolver } from "./diario-preferencia-agrupamento.resolver";
import { DiarioPreferenciaAgrupamentoService } from "./domain/diario-preferencia-agrupamento.service";

@Module({
  imports: [DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService, DiarioPreferenciaAgrupamentoResolver],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {
}
