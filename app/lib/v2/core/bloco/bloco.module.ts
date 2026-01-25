import { Module } from "@nestjs/common";
import { BlocoController } from "@/v2/adapters/in/http/bloco/bloco.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { BlocoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { CampusModule } from "../campus/campus.module";

/**
 * Módulo Bloco configurado com Arquitetura Hexagonal
 * - BlocoService: Implementa casos de uso (porta de entrada)
 * - BlocoTypeOrmRepositoryAdapter: Implementa IBlocoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CampusModule],
  controllers: [BlocoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IBlocoRepositoryPort",
      useClass: BlocoTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    BlocoService,
  ],
  exports: [BlocoService],
})
export class BlocoModule {}
