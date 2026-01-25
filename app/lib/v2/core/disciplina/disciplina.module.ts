import { Module } from "@nestjs/common";
import { DisciplinaController } from "@/v2/adapters/in/http/disciplina/disciplina.controller";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";

@Module({
  imports: [],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
