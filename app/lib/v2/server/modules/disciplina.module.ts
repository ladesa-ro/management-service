import { Module } from "@nestjs/common";
import { DisciplinaController } from "@/v2/adapters/in/http/disciplina/disciplina.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ArquivoModule } from "@/v2/core/arquivo/arquivo.module";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";
import { ImagemModule } from "@/v2/core/imagem/imagem.module";

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
