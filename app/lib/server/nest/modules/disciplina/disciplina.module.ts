import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DISCIPLINA_REPOSITORY_PORT } from "@/modules/disciplina/application/ports";
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaAuthzRegistrySetup,
  DisciplinaTypeOrmRepositoryAdapter,
} from "@/modules/disciplina/infrastructure";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { DisciplinaGraphqlResolver } from "./graphql/disciplina.graphql.resolver";
import { DisciplinaRestController } from "./rest/disciplina.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaRestController],
  providers: [
    NestJsPaginateAdapter,
    DisciplinaService,
    DisciplinaGraphqlResolver,
    DisciplinaAuthzRegistrySetup,
    {
      provide: DISCIPLINA_REPOSITORY_PORT,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
