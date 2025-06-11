import { Module } from "@nestjs/common";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaService } from "./disciplina.service";

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
