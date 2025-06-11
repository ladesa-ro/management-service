import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "./disponibilidade.controller";
import { DisponibilidadeService } from "./disponibilidade.service";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
