import { AulaModule } from "@/domain/resources/ensino/discente/aula/aula.module";
import { DiarioProfessorModule } from "@/domain/resources/ensino/discente/diario-professor/diario-professor.module";
import { DiarioModule } from "@/domain/resources/ensino/discente/diario/diario.module";
import { TurmaModule } from "@/domain/resources/ensino/discente/turma/turma.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [TurmaModule, DiarioModule, DiarioProfessorModule, AulaModule],
})
export class EnsinoDiscenteModule {}
