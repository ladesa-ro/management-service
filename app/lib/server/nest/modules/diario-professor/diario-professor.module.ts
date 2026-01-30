import { Module } from "@nestjs/common";
import { DIARIO_PROFESSOR_REPOSITORY_PORT } from "@/core/diario-professor/application/ports";
import { DiarioProfessorService } from "@/core/diario-professor/application/use-cases/diario-professor.service";
import { DiarioModule } from "@/server/nest/modules/diario";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioProfessorController } from "./rest";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: DIARIO_PROFESSOR_REPOSITORY_PORT,
      useClass: DiarioProfessorTypeOrmRepositoryAdapter,
    },
    DiarioProfessorService,
  ],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
