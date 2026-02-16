import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DISCIPLINA_REPOSITORY_PORT } from "@/modules/ensino/disciplina/application/ports";
import { DisciplinaService } from "@/modules/ensino/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaAuthzRegistrySetup,
  DisciplinaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/disciplina/infrastructure";
import { DisciplinaGraphqlResolver } from "@/modules/ensino/disciplina/presentation/graphql/disciplina.graphql.resolver";
import { DisciplinaRestController } from "@/modules/ensino/disciplina/presentation/rest/disciplina.rest.controller";

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
