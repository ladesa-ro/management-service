import { Module } from "@nestjs/common";
import { DiarioModule } from "@/Ladesa.Management.Application/ensino/diario/diario.module";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  DiarioPreferenciaAgrupamentoService,
} from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento";
import { DiarioPreferenciaAgrupamentoAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/infrastructure";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { DiarioPreferenciaAgrupamentoGraphqlResolver } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/presentation/graphql/diario-preferencia-agrupamento.graphql.resolver";
import { DiarioPreferenciaAgrupamentoController } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/presentation/rest";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
