import { Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/@base/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/@base/armazenamento/imagem/imagem.module";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/modules/ensino/curso";
import {
  CursoAuthzRegistrySetup,
  CursoTypeOrmRepositoryAdapter,
} from "@/modules/ensino/curso/infrastructure";
import { CursoGraphqlResolver } from "@/modules/ensino/curso/presentation/graphql/curso.graphql.resolver";
import { CursoRestController } from "@/modules/ensino/curso/presentation/rest/curso.rest.controller";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";

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
