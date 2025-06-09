import { Module } from "@nestjs/common";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaResolver } from "./disciplina.resolver";
import { DisciplinaService } from "./disciplina.service";

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaResolver],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
