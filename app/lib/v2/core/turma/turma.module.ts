import { Module } from "@nestjs/common";
import { TurmaController } from "@/v2/adapters/in/http/turma/turma.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { TurmaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { AmbienteModule } from "@/v2/core/ambiente/ambiente.module";
import { CursoModule } from "@/v2/core/curso/curso.module";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";

/**
 * Módulo Turma configurado com Arquitetura Hexagonal
 * - TurmaService: Implementa casos de uso (porta de entrada)
 * - TurmaTypeOrmRepositoryAdapter: Implementa ITurmaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [AmbienteModule, CursoModule],
  controllers: [TurmaController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "ITurmaRepositoryPort",
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
    TurmaService,
  ],
  exports: [TurmaService],
})
export class TurmaModule {}
