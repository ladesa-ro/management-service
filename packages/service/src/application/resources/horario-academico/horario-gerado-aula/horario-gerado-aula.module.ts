import { DiarioProfessorModule } from "@/application/resources/ensino/discente/diario-professor/diario-professor.module";
import { Module } from "@nestjs/common";
import { HorarioGeradoModule } from "../horario-gerado/horario-gerado.module";
import { HorarioGeradoAulaController } from "./horario-gerado-aula.controller";
import { HorarioGeradoAulaResolver } from "./horario-gerado-aula.resolver";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Module({
  imports: [DiarioProfessorModule, HorarioGeradoModule],
  providers: [HorarioGeradoAulaService, HorarioGeradoAulaResolver],
  controllers: [HorarioGeradoAulaController],
  exports: [HorarioGeradoAulaService],
})
export class HorarioGeradoAulaModule {}
