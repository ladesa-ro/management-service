import { Module } from "@nestjs/common";
import { CidadeController } from "@/v2/adapters/in/http/cidade/cidade.controller";
import { CidadeService } from "@/v2/core/cidade/application/use-cases/cidade.service";
import { CidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Cidade configurado com Arquitetura Hexagonal
 * - CidadeService: Implementa casos de uso (porta de entrada)
 * - CidadeTypeOrmRepositoryAdapter: Implementa ICidadeRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [CidadeController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "ICidadeRepositoryPort",
      useClass: CidadeTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    CidadeService,
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
