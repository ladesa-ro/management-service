import { Module } from "@nestjs/common";
import { AulaModule } from "@/application/resources/ensino/discente/aula/aula.module";
import { DiarioModule } from "@/application/resources/ensino/discente/diario/diario.module";
import { DiarioProfessorModule } from "@/application/resources/ensino/discente/diario-professor/diario-professor.module";
import { TurmaModule } from "@/application/resources/ensino/discente/turma/turma.module";

@Module({
  imports: [TurmaModule, DiarioModule, DiarioProfessorModule, AulaModule],
})
export class EnsinoDiscenteModule {}
