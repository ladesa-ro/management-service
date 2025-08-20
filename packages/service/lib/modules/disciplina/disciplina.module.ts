import { Module } from "@nestjs/common";
import { DisciplinaController } from "./api/disciplina.controller";
import { DisciplinaService } from "./domain/disciplina.service";

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
