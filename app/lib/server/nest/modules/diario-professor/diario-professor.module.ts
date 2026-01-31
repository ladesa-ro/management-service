import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { DIARIO_PROFESSOR_REPOSITORY_PORT } from "@/modules/diario-professor/application/ports";
import { DiarioProfessorService } from "@/modules/diario-professor/application/use-cases/diario-professor.service";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/modules/diario-professor/infrastructure/persistence/typeorm";
import { DiarioModule } from "@/server/nest/modules/diario";
import { PerfilModule } from "@/server/nest/modules/perfil";
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
