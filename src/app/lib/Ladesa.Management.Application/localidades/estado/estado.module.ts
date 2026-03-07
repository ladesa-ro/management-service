import { Module } from "@nestjs/common";
import { IEstadoRepository } from "@/Ladesa.Management.Application/localidades/estado/application/ports";
import { EstadoService } from "@/Ladesa.Management.Application/localidades/estado/application/use-cases/estado.service";
import {
  EstadoAuthzRegistrySetup,
  EstadoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/localidades/estado/infrastructure";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { EstadoGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/EstadoGraphqlResolver";
import { EstadoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/EstadoRestController";

@Module({
  imports: [],
  controllers: [EstadoRestController],
  providers: [
    NestJsPaginateAdapter,
    EstadoService,
    EstadoGraphqlResolver,
    EstadoAuthzRegistrySetup,
    {
      provide: IEstadoRepository,
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
