import { Module } from "@nestjs/common";
import { CidadeController } from "@/v2/adapters/in/http/cidade/cidade.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CidadeService } from "@/v2/core/cidade/application/use-cases/cidade.service";

/**
 * Módulo NestJS para Cidade
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [],
  controllers: [CidadeController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    CidadeService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "ICidadeRepositoryPort",
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
