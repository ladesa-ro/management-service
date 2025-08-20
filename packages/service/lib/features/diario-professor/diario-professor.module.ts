import { Module } from "@nestjs/common";
import { PerfilModule } from "@/features/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "./api/diario-professor.controller";
import { DiarioProfessorService } from "./domain/diario-professor.service";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
