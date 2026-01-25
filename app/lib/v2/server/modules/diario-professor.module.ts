import { Module } from "@nestjs/common";
import { DiarioProfessorController } from "@/v2/adapters/in/http/diario-professor/diario-professor.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioProfessorService } from "@/v2/core/diario-professor/application/use-cases/diario-professor.service";
import { DiarioModule } from "@/v2/server/modules/diario";
import { PerfilModule } from "@/v2/server/modules/perfil";

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
