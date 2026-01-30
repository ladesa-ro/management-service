import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { BlocoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { CampusModule } from "@/v2/server/modules/campus";
import { ImagemModule } from "@/v2/server/modules/imagem";
import { BlocoController } from "./http";

/**
 * Módulo NestJS para Bloco
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    BlocoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IBlocoRepositoryPort",
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [BlocoService],
})
export class BlocoModule {}
