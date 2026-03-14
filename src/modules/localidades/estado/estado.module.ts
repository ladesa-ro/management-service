import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  EstadoFindOneQueryHandlerImpl,
  EstadoListQueryHandlerImpl,
} from "@/modules/localidades/estado/application/use-cases/queries";
import {
  IEstadoFindOneQueryHandler,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries";
import { ESTADO_REPOSITORY_PORT } from "@/modules/localidades/estado/domain/repositories";
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
  exports: [],
})
export class EstadoModule {}
