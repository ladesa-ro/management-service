import { Module } from "@nestjs/common";
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
      provide: "IEstadoRepositoryPort",
      useClass: EstadoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
