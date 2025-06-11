import { DiarioModule } from "@/domain/resources/ensino/discente/diario/diario.module";
import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoController } from "./diario-preferencia-agrupamento.controller";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Module({
  imports: [DiarioModule],
  providers: [DiarioPreferenciaAgrupamentoService],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
