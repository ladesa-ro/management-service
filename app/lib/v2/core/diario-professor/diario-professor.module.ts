import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "@/v2/adapters/in/http/diario-professor/diario-professor.controller";
import { DiarioProfessorService } from "@/v2/core/diario-professor/application/use-cases/diario-professor.service";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
