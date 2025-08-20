import { Module } from "@nestjs/common";
import { DisponibilidadeModule } from "@/modules/disponibilidade/disponibilidade.module";
import { PerfilModule } from "@/modules/perfil/perfil.module";
import { ProfessorDisponibilidadeController } from "./api/professor-disponibilidade.controller";
import { ProfessorDisponibilidadeService } from "./domain/professor-disponibilidade.service";

@Module({
  imports: [PerfilModule, DisponibilidadeModule],
  controllers: [ProfessorDisponibilidadeController],
  providers: [ProfessorDisponibilidadeService],
  exports: [ProfessorDisponibilidadeService],
})
export class ProfessorDisponibilidadeModule {}
