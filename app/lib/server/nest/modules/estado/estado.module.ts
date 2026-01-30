import { Module } from "@nestjs/common";
import { ESTADO_REPOSITORY_PORT } from "@/core/estado/application/ports";
import { EstadoService } from "@/core/estado/application/use-cases/estado.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EstadoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EstadoRestController } from "./rest/estado.rest.controller";

@Module({
  imports: [],
  controllers: [EstadoRestController],
  providers: [
    NestJsPaginateAdapter,
    EstadoService,
    {
      provide: ESTADO_REPOSITORY_PORT,
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
