import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CursoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { CampusModule } from "@/v2/server/modules/campus";
import { ImagemModule } from "@/v2/server/modules/imagem";
import { OfertaFormacaoModule } from "@/v2/server/modules/oferta-formacao";
import { CursoController } from "./http";

/**
 * Módulo NestJS para Curso
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [CampusModule, OfertaFormacaoModule, ImagemModule, ArquivoModule],
  controllers: [CursoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    CursoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "ICursoRepositoryPort",
      useClass: CursoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CursoService],
})
export class CursoModule {}
