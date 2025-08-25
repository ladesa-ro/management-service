import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IndisponibilidadeProfessorEntity } from "@/infrastructure/integrations/database/typeorm/entities/07-horario-academico/indisponibilidade-professor.entity";
import { ProfessorIndisponibilidadeController } from "./api/professor-indisponibilidade.controller";
import { ProfessorIndisponibilidadeService } from "./domain/professor-indisponibilidade.service";

@Module({
  imports: [TypeOrmModule.forFeature([IndisponibilidadeProfessorEntity])],
  controllers: [ProfessorIndisponibilidadeController],
  providers: [ProfessorIndisponibilidadeService],
  exports: [ProfessorIndisponibilidadeService],
})
export class ProfessorIndisponibilidadeModule {}
