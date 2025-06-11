import { Module } from "@nestjs/common";
import { PerfilModule } from "../../../autorizacao/perfil/perfil.module";
import { DiarioModule } from "../diario/diario.module";
import { DiarioProfessorController } from "./diario-professor.controller";
import { DiarioProfessorService } from "./diario-professor.service";

@Module({
  imports: [DiarioModule, PerfilModule],
  controllers: [DiarioProfessorController],
  providers: [DiarioProfessorService],
  exports: [DiarioProfessorService],
})
export class DiarioProfessorModule {}
