import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DiarioProfessorTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DiarioProfessorService } from "@/v2/core/diario-professor/application/use-cases/diario-professor.service";
import { DiarioModule } from "@/server/nest/modules/diario";
import { PerfilModule } from "@/server/nest/modules/perfil";
import { DiarioProfessorController } from "./http";

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
