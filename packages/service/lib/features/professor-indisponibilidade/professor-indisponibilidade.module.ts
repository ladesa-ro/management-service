import { Module } from "@nestjs/common";
import { PerfilModule } from "@/features/perfil/perfil.module";
import { ProfessorIndisponibilidadeController } from "./api/professor-indisponibilidade.controller";
import { ProfessorIndisponibilidadeService } from "./domain/professor-indisponibilidade.service";
import { TypeormModule } from "@/infrastructure";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
