import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  DiarioPreferenciaAgrupamentoService,
} from "@/modules/diario-preferencia-agrupamento";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/modules/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { DiarioPreferenciaAgrupamentoGraphqlResolver } from "./graphql/diario-preferencia-agrupamento.graphql.resolver";
import { DiarioPreferenciaAgrupamentoController } from "./rest";

@Module({
  imports: [DiarioModule, IntervaloDeTempoModule],
  providers: [
    NestJsPaginateAdapter,
    DiarioPreferenciaAgrupamentoService,
    DiarioPreferenciaAgrupamentoGraphqlResolver,
    {
      provide: DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
      useClass: DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
    },
  ],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
