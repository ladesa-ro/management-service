import { Module } from "@nestjs/common";
import { ProfessorIndisponibilidadeService } from "@/v2/core/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import { TypeormModule } from "@/v2/old/infrastructure";
import { PerfilModule } from "@/v2/server/modules/perfil";
import { ProfessorIndisponibilidadeController } from "./http";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
