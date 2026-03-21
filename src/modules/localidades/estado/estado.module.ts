import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import {
  EstadoFindOneQueryHandler,
  EstadoListQueryHandler,
} from "@/modules/localidades/estado/application/queries";
import {
  IEstadoFindOneQueryHandler,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries";
import { IEstadoRepository } from "@/modules/localidades/estado/domain/repositories";
import { EstadoTypeOrmRepositoryAdapter } from "@/modules/localidades/estado/infrastructure.database";
import { EstadoGraphqlResolver } from "@/modules/localidades/estado/presentation.graphql/estado.graphql.resolver";
import { EstadoRestController } from "@/modules/localidades/estado/presentation.rest/estado.rest.controller";

@Module({
  imports: [],
  controllers: [EstadoRestController],
  providers: [
    NestJsPaginateAdapter,
    EstadoGraphqlResolver,
    {
      provide: IEstadoRepository,
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
    // Queries
    { provide: IEstadoListQueryHandler, useClass: EstadoListQueryHandler },
    { provide: IEstadoFindOneQueryHandler, useClass: EstadoFindOneQueryHandler },
  ],
  exports: [],
})
export class EstadoModule {}
