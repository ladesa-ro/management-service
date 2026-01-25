import { Module } from "@nestjs/common";
import { TurmaController } from "@/v2/adapters/in/http/turma/turma.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { TurmaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ArquivoModule } from "@/v2/core/arquivo/arquivo.module";
import { ImagemModule } from "@/v2/core/imagem/imagem.module";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { CursoModule } from "@/v2/server/modules/curso.module";

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
