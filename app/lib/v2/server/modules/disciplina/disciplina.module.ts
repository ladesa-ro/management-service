import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DISCIPLINA_REPOSITORY_PORT } from "@/core/disciplina/application/ports";
import { DisciplinaService } from "@/core/disciplina/application/use-cases/disciplina.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { DisciplinaController } from "./http";

/**
 * Módulo NestJS para Disciplina
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    DisciplinaService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: DISCIPLINA_REPOSITORY_PORT,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
