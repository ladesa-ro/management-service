import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ESTADO_REPOSITORY_PORT } from "@/modules/localidades/estado/application/ports";
import { EstadoService } from "@/modules/localidades/estado/application/use-cases/estado.service";
import {
  EstadoFindOneQueryHandlerImpl,
  EstadoListQueryHandlerImpl,
} from "@/modules/localidades/estado/application/use-cases/queries";
import {
  IEstadoFindOneQueryHandler,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries";
import {
  EstadoAuthzRegistrySetup,
  EstadoTypeOrmRepositoryAdapter,
} from "@/modules/localidades/estado/infrastructure";
import { EstadoGraphqlResolver } from "@/modules/localidades/estado/presentation/graphql/estado.graphql.resolver";
import { EstadoRestController } from "@/modules/localidades/estado/presentation/rest/estado.rest.controller";

@Module({
  imports: [],
  controllers: [EstadoRestController],
  providers: [
    NestJsPaginateAdapter,
    EstadoService,
    EstadoGraphqlResolver,
    EstadoAuthzRegistrySetup,
    {
      provide: ESTADO_REPOSITORY_PORT,
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
    // Queries
    { provide: IEstadoListQueryHandler, useClass: EstadoListQueryHandlerImpl },
    { provide: IEstadoFindOneQueryHandler, useClass: EstadoFindOneQueryHandlerImpl },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
