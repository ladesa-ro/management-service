import { Module } from "@nestjs/common";
import { PerfilModule } from "../../../autorizacao/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "./diario-professor.controller";
import { DiarioProfessorResolver } from "./diario-professor.resolver";
import { DiarioProfessorService } from "./diario-professor.service";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService, DiarioProfessorResolver],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
