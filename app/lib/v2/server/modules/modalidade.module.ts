import { Module } from "@nestjs/common";
import { ModalidadeController } from "@/v2/adapters/in/http/modalidade/modalidade.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";

/**
 * Módulo NestJS para Modalidade
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    ModalidadeService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IModalidadeRepositoryPort",
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
