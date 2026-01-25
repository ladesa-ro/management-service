import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "@/v2/adapters/in/http/diario-professor/diario-professor.controller";
import { DiarioProfessorService } from "@/v2/core/diario-professor/application/use-cases/diario-professor.service";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo DiarioProfessor configurado com Arquitetura Hexagonal
 * - DiarioProfessorService: Implementa casos de uso (porta de entrada)
 * - DiarioProfessorTypeOrmRepositoryAdapter: Implementa IDiarioProfessorRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDiarioProfessorRepositoryPort",
      useClass: DiarioProfessorTypeOrmRepositoryAdapter,
    },
    DiarioProfessorService,
  ],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
