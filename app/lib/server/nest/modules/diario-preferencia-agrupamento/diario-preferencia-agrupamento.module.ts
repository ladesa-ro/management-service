import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  DiarioPreferenciaAgrupamentoService,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import { DiarioPreferenciaAgrupamentoAuthzRegistrySetup } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { DiarioPreferenciaAgrupamentoGraphqlResolver } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/graphql/diario-preferencia-agrupamento.graphql.resolver";
import { DiarioPreferenciaAgrupamentoController } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/rest";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";

@Module({
  imports: [DiarioModule, IntervaloDeTempoModule],
  providers: [
    NestJsPaginateAdapter,
    DiarioPreferenciaAgrupamentoService,
    DiarioPreferenciaAgrupamentoGraphqlResolver,
    DiarioPreferenciaAgrupamentoAuthzRegistrySetup,
    {
      provide: DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
      useClass: DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
    },
  ],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
