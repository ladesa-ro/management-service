import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ESTADO_REPOSITORY_PORT } from "@/modules/estado/application/ports";
import { EstadoService } from "@/modules/estado/application/use-cases/estado.service";
import { EstadoTypeOrmRepositoryAdapter } from "@/modules/estado/infrastructure/persistence/typeorm";
import { EstadoGraphqlResolver } from "./graphql/estado.graphql.resolver";
import { EstadoRestController } from "./rest/estado.rest.controller";

@Module({
  imports: [],
  controllers: [EstadoRestController],
  providers: [
    NestJsPaginateAdapter,
    EstadoService,
    EstadoGraphqlResolver,
    {
      provide: ESTADO_REPOSITORY_PORT,
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
