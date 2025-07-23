import { DisponibilidadeDiaModule } from "@/application/resources/horario-academico/disponibilidade-dia/disponibilidade-dia.module";
import { ProfessorDisponibilidadeModule } from "@/application/resources/horario-academico/professor-disponibilidade/professor-disponibilidade.module";
import { TurmaDisponibilidadeModule } from "@/application/resources/horario-academico/turma-disponibilidade/turma-disponibilidade.module";
import { Module } from "@nestjs/common";
import { DiarioPreferenciaAgrupamentoModule } from "./diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DisponibilidadeModule } from "./disponibilidade/disponibilidade.module";
import { HorarioGeradoAulaModule } from "./horario-gerado-aula/horario-gerado-aula.module";
import { HorarioGeradoModule } from "./horario-gerado/horario-gerado.module";

@Module({
  imports: [
    DisponibilidadeModule,
    DisponibilidadeDiaModule,
    TurmaDisponibilidadeModule,
    ProfessorDisponibilidadeModule,
    DiarioPreferenciaAgrupamentoModule,
    HorarioGeradoModule,
    HorarioGeradoAulaModule,
  ],
})
export class HorarioAcademicoModule {}
