import { Module } from "@nestjs/common";
import { CampusModule } from "../campus/campus.module";
import { BlocoController } from "@/v2/adapters/in/http/bloco/bloco.controller";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { BlocoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

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
