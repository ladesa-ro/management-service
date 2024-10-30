import { DisponibilidadeModule } from "@/business-logic/resources/07-horario-academico/disponibilidade/disponibilidade.module";
import { Module } from "@nestjs/common";
import { DisponibilidadeDiaController } from "./disponibilidade-dia.controller";
import { DisponibilidadeDiaResolver } from "./disponibilidade-dia.resolver";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@Module({
  imports: [DisponibilidadeModule],
  providers: [DisponibilidadeDiaService, DisponibilidadeDiaResolver],
  controllers: [DisponibilidadeDiaController],
  exports: [DisponibilidadeDiaService],
})
export class DisponibilidadeDiaModule {}
