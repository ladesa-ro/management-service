import { Module } from "@nestjs/common";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  DiarioPreferenciaAgrupamentoService,
} from "@/core/diario-preferencia-agrupamento";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioPreferenciaAgrupamentoController } from "./rest";

@Module({
  imports: [DiarioModule, IntervaloDeTempoModule],
  providers: [
    NestJsPaginateAdapter,
    DiarioPreferenciaAgrupamentoService,
    {
      provide: DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
      useClass: DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
    },
  ],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
