import { Module } from "@nestjs/common";
import { DisciplinaController } from "./api/disciplina.controller";
import { DisciplinaResolver } from "./disciplina.resolver";
import { DisciplinaService } from "./domain/disciplina.service";

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaResolver],
  exports: [DisciplinaService],
})
export class DisciplinaModule {
}
