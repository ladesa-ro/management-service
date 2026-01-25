import { Module } from "@nestjs/common";
import { EnderecoModule } from "@/v2/core/endereco/endereco.module";
import { CampusController } from "@/v2/adapters/in/http/campus/campus.controller";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { CampusTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Campus configurado com Arquitetura Hexagonal
 * - CampusService: Implementa casos de uso (porta de entrada)
 * - CampusTypeOrmRepositoryAdapter: Implementa ICampusRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "ICampusRepositoryPort",
      useClass: CampusTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    CampusService,
  ],
  exports: [CampusService],
})
export class CampusModule {}
