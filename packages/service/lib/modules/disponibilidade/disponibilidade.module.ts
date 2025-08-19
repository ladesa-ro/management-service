import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "./api/disponibilidade.controller";
import { DisponibilidadeResolver } from "./disponibilidade.resolver";
import { DisponibilidadeService } from "./domain/disponibilidade.service";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService, DisponibilidadeResolver],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {
}
