import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { ImagemModule } from "@/v2/server/modules/imagem";
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
      provide: "IDisciplinaRepositoryPort",
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
