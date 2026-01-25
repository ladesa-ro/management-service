import { Module } from "@nestjs/common";
import { DiarioProfessorModule } from "@/v2/core/diario-professor/diario-professor.module";
import { HorarioGeradoModule } from "../horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaController } from "@/v2/adapters/in/http/horario-gerado-aula/horario-gerado-aula.controller";
import {
  HorarioGeradoAulaService
} from "@/v2/core/horario-gerado-aula/application/use-cases/horario-gerado-aula.service";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule],
  providers: [HorarioGeradoAulaService],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
