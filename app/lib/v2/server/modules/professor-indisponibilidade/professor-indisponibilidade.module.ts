import { Module } from "@nestjs/common";
import { TypeormModule } from "@/infrastructure";
import { ProfessorIndisponibilidadeService } from "@/v2/core/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import { PerfilModule } from "@/v2/server/modules/perfil";
import { ProfessorIndisponibilidadeController } from "./controllers";

@Module({
  imports: [PerfilModule, TypeormModule],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
