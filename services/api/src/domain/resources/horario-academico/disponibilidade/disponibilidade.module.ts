import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "./disponibilidade.controller";
import { DisponibilidadeResolver } from "./disponibilidade.resolver";
import { DisponibilidadeService } from "./disponibilidade.service";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService, DisponibilidadeResolver],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
