import { Module } from "@nestjs/common";
import { EstadoController } from "@/v2/adapters/in/http/estado/estado.controller";
import { EstadoService } from "@/v2/core/estado/application/use-cases/estado.service";
import { EstadoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Estado configurado com Arquitetura Hexagonal
 * - EstadoService: Implementa casos de uso (porta de entrada)
 * - EstadoTypeOrmRepositoryAdapter: Implementa IEstadoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [EstadoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IEstadoRepositoryPort",
      useClass: EstadoTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    EstadoService,
  ],
  exports: [EstadoService],
})
export class EstadoModule {}
