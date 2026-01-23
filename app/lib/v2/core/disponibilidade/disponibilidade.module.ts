import { Module } from "@nestjs/common";
import { DisponibilidadeController } from "./api/disponibilidade.controller";
import { DisponibilidadeService } from "./domain/disponibilidade.service";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
