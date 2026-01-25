import { Module } from "@nestjs/common";
import { ModalidadeController } from "@/v2/adapters/in/http/modalidade/modalidade.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";

/**
 * Módulo Modalidade configurado com Arquitetura Hexagonal
 * - ModalidadeService: Implementa casos de uso (porta de entrada)
 * - ModalidadeTypeOrmRepositoryAdapter: Implementa IModalidadeRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IModalidadeRepositoryPort",
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    ModalidadeService,
  ],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
