import { Module } from "@nestjs/common";
import { PerfilModule } from "@/v2/core/perfil/perfil.module";
import { TypeormModule } from "@/infrastructure";
import {
  ProfessorIndisponibilidadeController
} from "@/v2/adapters/in/http/professor-indisponibilidade/professor-indisponibilidade.controller";
import {
  ProfessorIndisponibilidadeService
} from "@/v2/core/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
