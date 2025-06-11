import { DiarioProfessorModule } from "@/domain/resources/ensino/discente/diario-professor/diario-professor.module";
import { Module } from "@nestjs/common";
import { HorarioGeradoModule } from "../horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaController } from "./horario-gerado-aula.controller";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule],
  providers: [HorarioGeradoAulaService],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
