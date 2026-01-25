import { Module } from "@nestjs/common";
import { CursoController } from "@/v2/adapters/in/http/curso/curso.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CursoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CampusModule } from "@/v2/core/campus/campus.module";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import { OfertaFormacaoModule } from "@/v2/core/oferta-formacao/oferta-formacao.module";

/**
 * Módulo Curso configurado com Arquitetura Hexagonal
 * - CursoService: Implementa casos de uso (porta de entrada)
 * - CursoTypeOrmRepositoryAdapter: Implementa ICursoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [CampusModule, OfertaFormacaoModule],
  controllers: [CursoController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "ICursoRepositoryPort",
      useClass: CursoTypeOrmRepositoryAdapter,
    },
    CursoService,
  ],
  exports: [CursoService],
})
export class CursoModule {}
