import { Module } from "@nestjs/common";
import { ESTADO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/localidades/estado/application/ports";
import { EstadoService } from "@/Ladesa.Management.Application/localidades/estado/application/use-cases/estado.service";
import {
  EstadoAuthzRegistrySetup,
  EstadoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/localidades/estado/infrastructure";
import { EstadoGraphqlResolver } from "@/Ladesa.Management.Application/localidades/estado/presentation/graphql/estado.graphql.resolver";
import { EstadoRestController } from "@/Ladesa.Management.Application/localidades/estado/presentation/rest/estado.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
