import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CURSO_REPOSITORY_PORT, CursoService } from "@/modules/curso";
import { CursoTypeOrmRepositoryAdapter } from "@/modules/curso/infrastructure/persistence/typeorm";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { CampusModule } from "@/server/nest/modules/campus";
import { ImagemModule } from "@/server/nest/modules/imagem";
import { OfertaFormacaoModule } from "@/server/nest/modules/oferta-formacao";
import { CursoGraphqlResolver } from "./graphql/curso.graphql.resolver";
import { CursoRestController } from "./rest/curso.rest.controller";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule, OfertaFormacaoModule],
  controllers: [CursoRestController],
  providers: [
    NestJsPaginateAdapter,
    CursoService,
    CursoGraphqlResolver,
    {
      provide: CURSO_REPOSITORY_PORT,
      useClass: CursoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CursoService],
})
export class CursoModule {}
