import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/modules/ensino/curso";
import {
  CursoAuthzRegistrySetup,
  CursoTypeOrmRepositoryAdapter,
} from "@/modules/ensino/curso/infrastructure";
import { CursoGraphqlResolver } from "@/modules/ensino/curso/presentation/graphql/curso.graphql.resolver";
import { CursoRestController } from "@/modules/ensino/curso/presentation/rest/curso.rest.controller";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";

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
