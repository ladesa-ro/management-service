import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "@/v2/adapters/in/http/nivel-formacao/nivel-formacao.controller";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo NivelFormacao configurado com Arquitetura Hexagonal
 * - NivelFormacaoService: Implementa casos de uso (porta de entrada)
 * - NivelFormacaoTypeOrmRepositoryAdapter: Implementa INivelFormacaoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "INivelFormacaoRepositoryPort",
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    NivelFormacaoService,
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
