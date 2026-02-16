import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CampusModule } from "@/modules/ambientes/campus";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/modules/ensino/curso";
import {
  CursoAuthzRegistrySetup,
  CursoTypeOrmRepositoryAdapter,
} from "@/modules/ensino/curso/infrastructure";
import { CursoGraphqlResolver } from "@/modules/ensino/curso/presentation/graphql/curso.graphql.resolver";
import { CursoRestController } from "@/modules/ensino/curso/presentation/rest/curso.rest.controller";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule, OfertaFormacaoModule],
  controllers: [CursoRestController],
  providers: [
    NestJsPaginateAdapter,
    CursoService,
    CursoGraphqlResolver,
    CursoAuthzRegistrySetup,
    {
      provide: CURSO_REPOSITORY_PORT,
      useClass: CursoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CursoService],
})
export class CursoModule {}
