import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { TurmaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";
import { AmbienteModule } from "@/v2/server/modules/ambiente";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { CursoModule } from "@/v2/server/modules/curso";
import { ImagemModule } from "@/v2/server/modules/imagem";
import { TurmaController } from "./http";

/**
 * Módulo NestJS para Turma
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [AmbienteModule, CursoModule, ImagemModule, ArquivoModule],
  controllers: [TurmaController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    TurmaService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "ITurmaRepositoryPort",
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaService],
})
export class TurmaModule {}
