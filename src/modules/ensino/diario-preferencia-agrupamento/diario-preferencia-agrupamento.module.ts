import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  DiarioPreferenciaAgrupamentoService,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import {
  DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl,
  DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl,
  DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl,
} from "@/modules/ensino/diario-preferencia-agrupamento/application/use-cases/commands";
import {
  DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl,
  DiarioPreferenciaAgrupamentoListQueryHandlerImpl,
} from "@/modules/ensino/diario-preferencia-agrupamento/application/use-cases/queries";
import {
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
  IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands";
import {
  IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries";
import { DiarioPreferenciaAgrupamentoAuthzRegistrySetup } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { DiarioPreferenciaAgrupamentoGraphqlResolver } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/graphql/diario-preferencia-agrupamento.graphql.resolver";
import { DiarioPreferenciaAgrupamentoController } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/rest";
@Module({
  imports: [DiarioModule],
  providers: [
    NestJsPaginateAdapter,
    DiarioPreferenciaAgrupamentoService,
    DiarioPreferenciaAgrupamentoGraphqlResolver,
    DiarioPreferenciaAgrupamentoAuthzRegistrySetup,
    {
      provide: DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
      useClass: DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IDiarioPreferenciaAgrupamentoCreateCommandHandler,
      useClass: DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
      useClass: DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
      useClass: DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl,
    },
    // Queries
    {
      provide: IDiarioPreferenciaAgrupamentoListQueryHandler,
      useClass: DiarioPreferenciaAgrupamentoListQueryHandlerImpl,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
      useClass: DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl,
    },
  ],
  controllers: [DiarioPreferenciaAgrupamentoController],
  exports: [DiarioPreferenciaAgrupamentoService],
})
export class DiarioPreferenciaAgrupamentoModule {}
