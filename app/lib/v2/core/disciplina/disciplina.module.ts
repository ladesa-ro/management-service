import { Module } from "@nestjs/common";
import { DisciplinaController } from "@/v2/adapters/in/http/disciplina/disciplina.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";

/**
 * Módulo Disciplina configurado com Arquitetura Hexagonal
 * - DisciplinaService: Implementa casos de uso (porta de entrada)
 * - DisciplinaTypeOrmRepositoryAdapter: Implementa IDisciplinaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDisciplinaRepositoryPort",
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
    DisciplinaService,
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
