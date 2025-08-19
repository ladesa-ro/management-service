import { Module } from "@nestjs/common";
import { PerfilModule } from "@/legacy/application/resources/autorizacao/perfil/perfil.module";
import {
  DisponibilidadeModule
} from "@/legacy/application/resources/horario-academico/disponibilidade/disponibilidade.module";
import { ProfessorDisponibilidadeController } from "./api/professor-disponibilidade.controller";
import { ProfessorDisponibilidadeResolver } from "./professor-disponibilidade.resolver";
import { ProfessorDisponibilidadeService } from "./domain/professor-disponibilidade.service";

@Module({
  imports: [PerfilModule, DisponibilidadeModule],
  controllers: [ProfessorDisponibilidadeController],
  providers: [ProfessorDisponibilidadeService, ProfessorDisponibilidadeResolver],
  exports: [ProfessorDisponibilidadeService],
})
export class ProfessorDisponibilidadeModule {
}
