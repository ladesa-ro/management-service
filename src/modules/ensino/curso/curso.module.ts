import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { CURSO_REPOSITORY_PORT } from "@/modules/ensino/curso";
import {
  CursoCreateCommandHandlerImpl,
  CursoDeleteCommandHandlerImpl,
  CursoUpdateCommandHandlerImpl,
  CursoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/curso/application/use-cases/commands";
import {
  CursoFindOneQueryHandlerImpl,
  CursoGetImagemCapaQueryHandlerImpl,
  CursoListQueryHandlerImpl,
} from "@/modules/ensino/curso/application/use-cases/queries";
import {
  ICursoCreateCommandHandler,
  ICursoDeleteCommandHandler,
  ICursoUpdateCommandHandler,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands";
import {
  ICursoFindOneQueryHandler,
  ICursoGetImagemCapaQueryHandler,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries";
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
    CursoGraphqlResolver,
    CursoAuthzRegistrySetup,
    {
      provide: CURSO_REPOSITORY_PORT,
      useClass: CursoTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: ICursoCreateCommandHandler, useClass: CursoCreateCommandHandlerImpl },
    { provide: ICursoUpdateCommandHandler, useClass: CursoUpdateCommandHandlerImpl },
    { provide: ICursoDeleteCommandHandler, useClass: CursoDeleteCommandHandlerImpl },
    {
      provide: ICursoUpdateImagemCapaCommandHandler,
      useClass: CursoUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: ICursoListQueryHandler, useClass: CursoListQueryHandlerImpl },
    { provide: ICursoFindOneQueryHandler, useClass: CursoFindOneQueryHandlerImpl },
    { provide: ICursoGetImagemCapaQueryHandler, useClass: CursoGetImagemCapaQueryHandlerImpl },
  ],
  exports: [ICursoFindOneQueryHandler],
})
export class CursoModule {}
