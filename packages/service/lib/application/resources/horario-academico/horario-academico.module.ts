import { Module } from "@nestjs/common";
import { DisponibilidadeDiaModule } from "@/application/resources/horario-academico/disponibilidade-dia/disponibilidade-dia.module";
import { TurmaDisponibilidadeModule } from "@/application/resources/horario-academico/turma-disponibilidade/turma-disponibilidade.module";
import { DiarioPreferenciaAgrupamentoModule } from "./diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DisponibilidadeModule } from "./disponibilidade/disponibilidade.module";
import { HorarioGeradoModule } from "./horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaModule } from "./horario-gerado-aula/horario-gerado-aula.module";

@Module({
  imports: [DisponibilidadeModule, DisponibilidadeDiaModule, TurmaDisponibilidadeModule, DiarioPreferenciaAgrupamentoModule, HorarioGeradoModule, HorarioGeradoAulaModule],
})
export class HorarioAcademicoModule {}
