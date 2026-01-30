import { Module } from "@nestjs/common";
import { DISCIPLINA_REPOSITORY_PORT } from "@/core/disciplina/application/ports";
import { DisciplinaService } from "@/core/disciplina/application/use-cases/disciplina.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DisciplinaRestController } from "./rest/disciplina.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaRestController],
  providers: [
    NestJsPaginateAdapter,
    DisciplinaService,
    {
      provide: DISCIPLINA_REPOSITORY_PORT,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
