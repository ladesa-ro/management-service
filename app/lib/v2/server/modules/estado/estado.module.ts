import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EstadoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EstadoService } from "@/v2/core/estado/application/use-cases/estado.service";
import { EstadoController } from "./http";

@Module({
  imports: [],
  controllers: [EstadoController],
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
