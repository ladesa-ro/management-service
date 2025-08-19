import { Module } from "@nestjs/common";
import {
  DisponibilidadeModule
} from "@/legacy/application/resources/horario-academico/disponibilidade/disponibilidade.module";
import { DisponibilidadeDiaController } from "./api/disponibilidade-dia.controller";
import { DisponibilidadeDiaResolver } from "./disponibilidade-dia.resolver";
import { DisponibilidadeDiaService } from "./domain/disponibilidade-dia.service";

@Module({
  imports: [DisponibilidadeModule],
  providers: [DisponibilidadeDiaService, DisponibilidadeDiaResolver],
  controllers: [DisponibilidadeDiaController],
  exports: [DisponibilidadeDiaService],
})
export class DisponibilidadeDiaModule {
}
