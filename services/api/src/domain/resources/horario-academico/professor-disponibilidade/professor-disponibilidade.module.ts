import { PerfilModule } from "@/domain/resources/autorizacao/perfil/perfil.module";
import { DisponibilidadeModule } from "@/domain/resources/horario-academico/disponibilidade/disponibilidade.module";
import { Module } from "@nestjs/common";
import { ProfessorDisponibilidadeController } from "./professor-disponibilidade.controller";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@Module({
  imports: [PerfilModule, DisponibilidadeModule],
  controllers: [ProfessorDisponibilidadeController],
  providers: [ProfessorDisponibilidadeService],
  exports: [ProfessorDisponibilidadeService],
})
export class ProfessorDisponibilidadeModule {}
