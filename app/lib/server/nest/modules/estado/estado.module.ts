import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ESTADO_REPOSITORY_PORT } from "@/modules/base/localidades/estado/application/ports";
import { EstadoService } from "@/modules/base/localidades/estado/application/use-cases/estado.service";
import {
  EstadoAuthzRegistrySetup,
  EstadoTypeOrmRepositoryAdapter,
} from "@/modules/base/localidades/estado/infrastructure";
import { EstadoGraphqlResolver } from "./graphql/estado.graphql.resolver";
import { EstadoRestController } from "./rest/estado.rest.controller";

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
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
