import { Module } from "@nestjs/common";
import { PerfilModule } from "@/modules/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "./api/diario-professor.controller";
import { DiarioProfessorResolver } from "./diario-professor.resolver";
import { DiarioProfessorService } from "./domain/diario-professor.service";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService, DiarioProfessorResolver],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {
}
