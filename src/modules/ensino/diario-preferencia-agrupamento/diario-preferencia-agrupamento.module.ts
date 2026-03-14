import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DiarioModule } from "@/modules/ensino/diario/diario.module";
import { IDiarioPreferenciaAgrupamentoRepository } from "@/modules/ensino/diario-preferencia-agrupamento";
import { DiarioPreferenciaAgrupamentoPermissionCheckerImpl } from "@/modules/ensino/diario-preferencia-agrupamento/application/authorization";
import {
  DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl,
  DiarioPreferenciaAgrupamentoDeleteCommandHandlerImpl,
  DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl,
} from "@/modules/ensino/diario-preferencia-agrupamento/application/commands";
import {
  DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl,
  DiarioPreferenciaAgrupamentoListQueryHandlerImpl,
} from "@/modules/ensino/diario-preferencia-agrupamento/application/queries";
import { IDiarioPreferenciaAgrupamentoPermissionChecker } from "@/modules/ensino/diario-preferencia-agrupamento/domain/authorization";
import {
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
  IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands";
import {
  IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries";
import { DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { DiarioPreferenciaAgrupamentoGraphqlResolver } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/graphql/diario-preferencia-agrupamento.graphql.resolver";
import { DiarioPreferenciaAgrupamentoController } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/rest";
@Module({
  imports: [DiarioModule],
  providers: [
    NestJsPaginateAdapter,
    DiarioPreferenciaAgrupamentoGraphqlResolver,
    {
      provide: IDiarioPreferenciaAgrupamentoPermissionChecker,
      useClass: DiarioPreferenciaAgrupamentoPermissionCheckerImpl,
    },
    {
      provide: IDiarioPreferenciaAgrupamentoRepository,
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
  exports: [],
})
export class DiarioPreferenciaAgrupamentoModule {}
