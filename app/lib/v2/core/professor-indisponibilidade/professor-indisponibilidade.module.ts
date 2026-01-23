import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { TypeormModule } from "@/infrastructure";
import { ProfessorIndisponibilidadeController } from "./api/professor-indisponibilidade.controller";
import { ProfessorIndisponibilidadeService } from "./domain/professor-indisponibilidade.service";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
